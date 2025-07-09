import { ActivityLog } from '../entities/activity-log.entity';
export declare enum AuthMethod {
    EMAIL = "email",
    STARKNET = "starknet",
    export,
    enum,
    UserRole
}
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    starknetAddress: string;
    authMethod: AuthMethod;
    role: UserRole;
    activityLogs: ActivityLog[];
    createdAt: Date;
    updatedAt: Date;
    validateAuthMethod(): void;
}
