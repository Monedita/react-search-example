import { useMemo } from 'react';

import type { User } from '../types/User';
import type { ConfigContextType } from '../contexts/ConfigContext';

// Context
import { useConfig } from '../contexts/ConfigContext';


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

export default function useFilter(items: User[], searchTerm: string ): User[] {
    const { config } = useConfig();

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
    if (!normalizedTerm) return items as User[];
    return items
      .map(item => {
        let score = 0;
        Object.keys(config).forEach(key => {
          const value = String(item[key as keyof User]).toLowerCase();
          const configKey = config[key as keyof ConfigContextType];
          if (!configKey?.enabled) return;
          if (value.includes(normalizedTerm)) {
            score = score > configKey.weight ? score : configKey.weight;
          } else {
            for (const regex of regexPatterns ) {
              if (regex.regex.test(value)) {
                let newScore = configKey.weight * regex.multiplier;
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
  }, [items, searchTerm, config]);

}