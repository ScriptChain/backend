import { ActivityLog } from '../entities/activity-log.entity';
export declare enum AuthMethod {
    EMAIL = "email",
    STARKNET = "starknet"
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
    activityLogs: ActivityLog[];
    createdAt: Date;
    updatedAt: Date;
    validateAuthMethod(): void;
}
