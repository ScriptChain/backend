import { User } from './user.entity';
import { Book } from './book.entity';
export declare class ActivityLog {
    id: string;
    action: string;
    description: string;
    user: User;
    book: Book;
    createdAt: Date;
}
