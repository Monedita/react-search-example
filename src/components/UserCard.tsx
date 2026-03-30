import type { ReactNode } from 'react';

import type { SearchableUserField, User } from '../types/User';

import CircularLoadingBar from './CircularLoadingBar';

function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatch(user: User, key: SearchableUserField): ReactNode {
    const value = user[key];

    if (!user.searchResults || user.searchResults.field !== key || !user.searchResults.match) {
        return value;
    }

    const { match } = user.searchResults;
    const parts = value.split(new RegExp(`(${escapeRegExp(match)})`, 'gi'));

    return (
        <>
            {parts.map((part, index) => (
                <span key={index} className={part.toLowerCase() === match.toLowerCase() ? 'bg-blue-500' : ''}>
                    {part}
                </span>
            ))}
        </>
    );
}

export default function UserCard({ user }: { user: User }) {
    return (
        <li
            className="relative mb-4 rounded-r-2xl rounded-l-full flex items-center gap-4 p-1 text-gray-200 bg-white/10 border border-white/20 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:border-white/40 hover:bg-white/20 group opacity-0 animate-fade-in"
        >
            <img src={user.img} alt={user.fullName} className="w-16 h-16 flex-none rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300" />
            <CircularLoadingBar progress={user.searchResults?.score || 0} strokeWidth={4} />
            <div className="flex-none shrink">
                <h3 className="font-bold text-white text-lg drop-shadow-sm">{highlightMatch(user, 'fullName')}</h3>
                <p className="text-sm text-gray-300">{highlightMatch(user, 'email')}</p>
            </div>
            <div className="hidden md:block flex-none shrink">
                <p className="text-sm text-gray-200">{highlightMatch(user, 'jobArea')} <span className="text-gray-400">[{highlightMatch(user, 'jobType')}]</span></p>
                <p className="text-sm text-gray-300 italic">{highlightMatch(user, 'bio')}</p>
            </div>
            <div className='absolute max-w-full truncate text-xs bottom-0 right-1'>
                {highlightMatch(user, 'id')}
            </div>
        </li>
    );
}