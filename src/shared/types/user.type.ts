import { UserType } from './user-type.enum.js';

export type User = {
    name: string;
    email: string;
    password: string;
    userType: UserType;
    avatarPath?: string;
}