import { ActivityLog } from '../entities/activity-log.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    activityLogs: ActivityLog[];
    createdAt: Date;
    updatedAt: Date;
}
