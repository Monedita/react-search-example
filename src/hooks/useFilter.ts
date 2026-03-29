import { useMemo } from 'react';

import type { FilterKey } from '../types/FilterKey';

type WithScore<T> = T & { searchScore?: number };

interface regexCache {
  regex: RegExp;
  multiplier: number;
}

export default function useFilter<T>(items: T[], searchTerm: string, keys: FilterKey<T>[]): WithScore<T>[] {

  const regexs = useMemo(() => {
    const normalizedTerm = searchTerm.toLowerCase().trim();
    const patterns: regexCache[] = [];
    //user regex pattern
    try {
      patterns.push({ regex: new RegExp(normalizedTerm, 'i'), multiplier: 1 });
    } catch (e) {
    }
    //transposition
    for (let i = 0; i < normalizedTerm.length - 1; i++) {
      try {
        patterns.push(
          {
            regex: new RegExp(
              `${normalizedTerm.slice(0, i)}${normalizedTerm[i + 1]}${normalizedTerm[i]}${normalizedTerm.slice(i + 2)}`, 'i'
            ),
            multiplier: 0.8
          }
        );
      } catch (e) {
      }
    }
    //typo
    for (let i = 0; i < normalizedTerm.length; i++) {
      try {
        patterns.push(
          {
            regex: new RegExp(
              `${normalizedTerm.slice(0, i)}.${normalizedTerm.slice(i + 1)}`, 'i'
            ),
            multiplier: 0.6
          }
        );
      } catch (e) {
      }
    }
    // Missing character
    for (let i = 0; i < normalizedTerm.length - 1; i++) {
      try {
        patterns.push(
          {
            regex: new RegExp(
              `${normalizedTerm.slice(0, i)}.${normalizedTerm.slice(i)}`, 'i'
            ),
            multiplier: 0.5
          }
        );
      } catch (e) {
      }
    }
    //insertion regex generation
    for (let i = 0; i <= normalizedTerm.length; i++) {
      try {
        patterns.push(
          {
            regex: new RegExp(
              `${normalizedTerm.slice(0, i)}${normalizedTerm.slice(i + 1)}`, 'i'
            ),
            multiplier: 0.5
          }
        );
      } catch (e) {
      }
    }
    return patterns;
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
            for (const regex of regexs) {
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