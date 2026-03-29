import type { User } from '../types/User';

import CircularLoadingBar from './CircularLoadingBar';

export default function UserCard({ user }: { user: User }) {
    return (
        <li
            className="relative mb-4 rounded-r-2xl rounded-l-full flex items-center gap-4 p-1 text-gray-200 bg-white/10 border border-white/20 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:border-white/40 hover:bg-white/20 group opacity-0 animate-fade-in"
        >
            <img src={user.img} alt={user.fullName} className="w-16 h-16 flex-none rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300" />
            <CircularLoadingBar max={17} value={user.searchScore || 0} strokeWidth={4} />
            <div className="flex-none shrink">
                <h3 className="font-bold text-white text-lg drop-shadow-sm">{user.fullName}</h3>
                <p className="text-sm text-gray-300">{user.email}</p>
            </div>
            <div className="flex-1 shrink">
                <p className="text-sm text-gray-200">{user.jobArea} <span className="text-gray-400">[{user.jobType}]</span></p>
                <p className="text-sm text-gray-300 italic">{user.bio}</p>
            </div>
        </li>
    );
}