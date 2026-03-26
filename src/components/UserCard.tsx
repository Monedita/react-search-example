import type { User } from '../types/User';

import CircularLoadingBar from './CircularLoadingBar';

export default function UserCard({ user }: { user: User }) {
    return (
        <li className="mb-4 rounded-full flex items-center gap-4 bg-gray-800 p-1 text-gray-500">
            <div className='w-16 h-16 flex-none relative'>
                <img src={user.img} alt={user.fullName} className="w-full h-full flex-none rounded-full" />
                <CircularLoadingBar max={17} value={user.searchScore || 0} strokeWidth={4} />
            </div>
            <div className="flex-none shrink">
                <h3 className="font-bold text-white">{user.fullName}</h3>
                <p className="text-sm">{user.email}</p>
            </div>
            <div className="flex-1 shrink">
                <p className="text-sm">{user.jobArea} [{user.jobType}] </p>
                <p className="text-sm">{user.bio}</p>
            </div>
        </li>
    );
}