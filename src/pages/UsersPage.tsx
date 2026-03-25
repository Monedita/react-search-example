import { useState, useEffect } from 'react';

import type { User } from '../types/User';
import type { FilterKey } from '../types/FilterKey';

import SearchInput from '../components/SearchInput';
import UsersList from '../components/UsersList';

import useFilter from '../hooks/useFilter';

import fetchFakeUsers from '../utils/fetchFakeUsers';

const USER_SEARCH_KEYS: FilterKey<User>[]  = [
    { key: 'fullName', weight: 5 },
    // { key: 'firstName', weight: 1 },
    // { key: 'lastName', weight: 1 },
    { key: 'id', weight: 4 },
    { key: 'email', weight: 3 },
    // { key: 'img', weight: 1 },
    { key: 'jobArea', weight: 2 },
    { key: 'jobType', weight: 2 },
    { key: 'bio', weight: 1 },
];

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const filteredUsers = useFilter(users, searchTerm, USER_SEARCH_KEYS);

    useEffect(() => {
        // Fake API call to fetch users
        async function loadUsers() {
            const fetchedUsers = await fetchFakeUsers();
            setUsers(fetchedUsers);
        }
        loadUsers();
    }, []);

    return (
        <div className="w-full h-full overflow-hidden flex flex-col">
            <SearchInput setSearchTerm={setSearchTerm} />
            <UsersList users={filteredUsers} />
        </div>
    );
}