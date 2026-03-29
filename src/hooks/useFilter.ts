import { useMemo } from 'react';

import type { FilterKey } from '../types/FilterKey';

type WithScore<T> = T & { searchScore?: number };

interface regexCache {
  regex: RegExp;
  multiplier: number;
}

function addRegexPattern (normalizedTerm: string, regexPatterns: regexCache[], i: number, displacement: number, stringAddition: string, multiplier: number) {
  try {
    regexPatterns.push(
      {
        regex: new RegExp(
          `${normalizedTerm.slice(0, i)}${stringAddition || ''}${normalizedTerm.slice(i + displacement)}`, 'i'
        ),
        multiplier: multiplier
      }
    );
  } catch (e) {
  }
}

export default function useFilter<T>(items: T[], searchTerm: string, keys: FilterKey<T>[]): WithScore<T>[] {

  const regexPatterns : regexCache[] = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const regexPatterns: regexCache[] = [];
    const normalizedTerm = searchTerm.toLowerCase().trim();
    //user regex pattern
    addRegexPattern (normalizedTerm, regexPatterns, 0, 0, '', 1);
    for (let i = 0; i < normalizedTerm.length - 1; i++) {
      //transposition
      addRegexPattern (normalizedTerm, regexPatterns, i, 2, `${normalizedTerm[i + 1]}${normalizedTerm[i]}`, 0.8);
      //typo
      addRegexPattern (normalizedTerm, regexPatterns, i, 1, '.', 0.6);
      // Missing character
      addRegexPattern (normalizedTerm, regexPatterns, i, 0, '.', 0.5);
      //insertion regex generation
      addRegexPattern (normalizedTerm, regexPatterns, i, 1, '', 0.5);
    }
    return regexPatterns.sort((a, b) => b.multiplier - a.multiplier);
  }, [searchTerm]);

  return useMemo(() => {
    const normalizedTerm = searchTerm.toLowerCase().trim();
    if (!normalizedTerm) return items as WithScore<T>[];
    return items
      .map(item => {
        let score = 0;
        keys.forEach(key => {
          const value = String(item[key.key]).toLowerCase();
          if (value.includes(normalizedTerm)) {
            score = score > key.weight ? score : key.weight;
          } else {
            for (const regex of regexPatterns ) {
              if (regex.regex.test(value)) {
                let newScore = key.weight * regex.multiplier;
                score = score > newScore ? score : newScore;
                break;
              }
            }
          }
        });
        return { ...item, searchScore: score };
      })
      .filter(item => item.searchScore! > 0)
      .sort((a, b) => b.searchScore! - a.searchScore!);
  }, [items, searchTerm, keys]);

}