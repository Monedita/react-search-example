import { useState, useEffect } from 'react';

import type { User } from '../types/User';

import SearchInput from '../components/SearchInput';
import UsersList from '../components/UsersList';
import ConfigPopUp from '../components/ConfigPopUp';

import useFilter from '../hooks/useFilter';

import fetchFakeUsers from '../utils/fetchFakeUsers';

import config from '../assets/config.svg';
import github from '../assets/github.svg';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
    const filteredUsers = useFilter(users, searchTerm);

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
            <SearchInput setSearchTerm={setSearchTerm}>
                <img src={config} onClick={() => setIsConfigOpen(true)} alt="Config" className="w-6 h-6 flex-none cursor-pointer" />
                <a
                    href="https://github.com/Monedita/react-search-example"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={github} alt="GitHub" className="w-6 h-6" />
                </a>
            </SearchInput>

            <UsersList users={filteredUsers} />

            <ConfigPopUp isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />

        </div>
    );
}