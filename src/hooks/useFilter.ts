import { useMemo } from 'react';

import type { FilterKey } from '../types/FilterKey';

type WithScore<T> = T & { searchScore?: number };

export default function useFilter<T>(items: T[], searchTerm: string, keys: FilterKey<T>[]): WithScore<T>[] {
  return useMemo(() => {
    const normalizedTerm = searchTerm.toLowerCase().trim();
    if (!normalizedTerm) return items as WithScore<T>[];
    return items
      .map(item => {
        let score = 0;
        keys.forEach(key => {
          const value = String(item[key.key]).toLowerCase();
          if (value.includes(normalizedTerm)) {
            score += key.weight;
          }
        });
        return { ...item, searchScore: score };
      })
      .filter(item => item.searchScore! > 0)
      .sort((a, b) => b.searchScore! - a.searchScore!);
  }, [items, searchTerm, keys]);
}