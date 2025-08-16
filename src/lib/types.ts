export interface User {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
}

export interface UserPayload {
    email: string | null;
    username: string;
    password: string;
}
