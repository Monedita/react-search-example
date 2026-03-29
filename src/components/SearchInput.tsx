import { useState } from 'react';
import { useDebounceCallback } from '../hooks/useDebounceCallback';

export default function SearchInput({ setSearchTerm, children }: { setSearchTerm: (term: string) => void, children?: React.ReactNode }) {
    const [inputValue, setInputValue] = useState('');
    useDebounceCallback(setSearchTerm, inputValue, 600);

    return (
        <div className="flex-none w-full flex gap-2 border rounded-full p-2 pl-4 mb-4 animate-fade-in">

            <input
                type="text"
                placeholder="Search users..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 outline-none"
            />

            {children}

        </div>
    );
}