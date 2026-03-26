
# React Search Example

This project is a small demo of a search system built with React, TypeScript, and Vite. It features a debounced search input and a scoring-based filtering system for results.

**Note:** This project is a work in progress and not yet finished.


## Features

- **Debounced search input** (prevents excessive filtering on every keystroke)
- **Advanced fuzzy search with typo tolerance** powered by `useFilter`:
   - Supports partial matches, case-insensitive search, and ranking by relevance.
   - Tolerates common typing mistakes:
      - **Transposition errors** (e.g., "gril" for "girl")
      - **Typo errors** (missing or wrong character)
      - **Insertion errors** (extra character added)
   - Results are scored and sorted by how closely they match the search term.
- Fake data generation for demonstration purposes
- TypeScript for type safety
- Modern React with hooks

## Getting Started

1. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   ```
2. Start the development server:
   ```sh
   pnpm dev
   # or
   npm run dev
   ```

---

This project is for portfolio/demo purposes only.
