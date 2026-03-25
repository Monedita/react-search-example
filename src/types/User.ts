export interface User {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    img: string;
    jobArea: string;
    jobType: string;
    bio: string;
    searchScore?: number;
}