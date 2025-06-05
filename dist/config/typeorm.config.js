"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const config = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'quiz_game',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    logger: 'advanced-console',
    autoLoadEntities: true,
};
exports.default = config;
//# sourceMappingURL=typeorm.config.js.map