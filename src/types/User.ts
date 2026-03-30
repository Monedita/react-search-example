export type SearchableUserField = 'id' | 'fullName' | 'email' | 'jobArea' | 'jobType' | 'bio';

export interface User {
    id: string;
    fullName: string;
    email: string;
    img: string;
    jobArea: string;
    jobType: string;
    bio: string;
    searchResults?: {
        field: SearchableUserField;
        score: number;
        match: string;
    };
}