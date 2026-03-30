import { useMemo } from 'react';

import type { SearchableUserField, User } from '../types/User';
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
    const max = Math.max(...Object.values(config).map(c => c.weight), 1);
    return items
      .map(item => {
        let score = 0;
        let field: SearchableUserField = 'id';
        let match = '';
        Object.keys(config).forEach(key => {
          const configKey = config[key as keyof ConfigContextType];
          if (!configKey?.enabled) return;
          const userKey = key as SearchableUserField;
          const value = String(item[userKey]).toLowerCase();
          if (value.includes(normalizedTerm)) {
            if (configKey.weight > score) {
              score = configKey.weight;
              field = userKey;
              match = normalizedTerm;
            }
          } else {
            for (const regex of regexPatterns ) {
              if (regex.regex.test(value)) {
                let newScore = configKey.weight * regex.multiplier;
                if (newScore > score) {
                  score = newScore;
                  field = userKey;
                  match = value.match(regex.regex)?.[0] || '';
                }
                break;
              }
            }
          }
        });
        return { ...item, searchResults: { field, score: Math.min(Math.max(score / max, 0), 1), match } };
      })
      .filter(item => item.searchResults?.score > 0)
      .sort((a, b) => b.searchResults!.score - a.searchResults!.score);
  }, [items, searchTerm, config]);

}