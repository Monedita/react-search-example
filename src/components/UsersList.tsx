import type { User } from '../types/User';

import UserCard from './UserCard';

export default function UsersList({ users }: { users: User[] }) {
    return (
        <ul className='flex-1 w-full overflow-y-auto px-4'>
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </ul>
    );
}