import { useState } from 'react';
import { useDebounceCallback } from '../hooks/useDebounceCallback';

export default function SearchInput({ setSearchTerm }: { setSearchTerm: (term: string) => void }) {
    const [inputValue, setInputValue] = useState('');
    useDebounceCallback(setSearchTerm, inputValue, 600);

    return (
        <input
            type="text"
            placeholder="Search users..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-none w-full border p-2 mb-4"
        />
    );
}