import { ActivityLog } from '../entities/activity-log.entity';
export declare class Book {
    id: string;
    title: string;
    author: string;
    description: string;
    isbn: string;
    price: number;
    stockQuantity: number;
    activityLogs: ActivityLog[];
    createdAt: Date;
    updatedAt: Date;
}
