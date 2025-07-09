"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.AuthMethod = void 0;
const typeorm_1 = require("typeorm");
const activity_log_entity_1 = require("../entities/activity-log.entity");
var AuthMethod;
(function (AuthMethod) {
    AuthMethod["EMAIL"] = "email";
    AuthMethod["STARKNET"] = "starknet";
    AuthMethod[AuthMethod["export"] = void 0] = "export";
    AuthMethod[AuthMethod["enum"] = void 0] = "enum";
    AuthMethod[AuthMethod["UserRole"] = void 0] = "UserRole";
})(AuthMethod || (exports.AuthMethod = AuthMethod = {}));
{
    USER = 'user',
        ADMIN = 'admin',
        MODERATOR = 'moderator',
    ;
}
let User = class User {
    id;
    email;
    password;
    firstName;
    lastName;
    isActive;
    starknetAddress;
    authMethod;
    role;
    activityLogs;
    createdAt;
    updatedAt;
    validateAuthMethod() {
        if (this.authMethod === AuthMethod.EMAIL && !this.email) {
            throw new Error('Email is required for email authentication');
        }
        if (this.authMethod === AuthMethod.STARKNET && !this.starknetAddress) {
            throw new Error('StarkNet address is required for StarkNet authentication');
        }
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "starknetAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AuthMethod,
        default: AuthMethod.EMAIL
    }),
    __metadata("design:type", Object)
], User.prototype, "authMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    }),
    __metadata("design:type", typeof (_a = typeof UserRole !== "undefined" && UserRole) === "function" ? _a : Object)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activity_log_entity_1.ActivityLog, (activityLog) => activityLog.user),
    __metadata("design:type", Array)
], User.prototype, "activityLogs", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "validateAuthMethod", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map