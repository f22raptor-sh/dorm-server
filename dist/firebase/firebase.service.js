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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const admin = require('firebase-admin');
const serviceAccount = require((0, path_1.join)(process.cwd(), '/key/dormitory-server-firebase-adminsdk-1bg21-91498cdcb6.json'));
let FirebaseService = class FirebaseService {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://dormitory-server-default-rtdb.firebaseio.com/',
        });
        this.database = admin.database();
    }
    async push(path, data) {
        try {
            const ref = this.getRef(path);
            await ref.push(data);
            return { status: 200, message: 'Data successfully pushed' };
        }
        catch (error) {
            console.error('Push error:', error);
            return { status: 500, message: `Error pushing data: ${error.message}` };
        }
    }
    async set(path, data) {
        try {
            const ref = this.getRef(path);
            await ref.set(data);
            return { status: 200, message: 'Data successfully set' };
        }
        catch (error) {
            console.error('Set error:', error);
            return { status: 500, message: `Error setting data: ${error.message}` };
        }
    }
    async update(path, data) {
        try {
            const ref = this.getRef(path);
            await ref.update(data);
            return { status: 200, message: 'Data successfully updated' };
        }
        catch (error) {
            console.error('Update error:', error);
            return { status: 500, message: `Error updating data: ${error.message}` };
        }
    }
    async remove(path) {
        try {
            const ref = this.getRef(path);
            await ref.remove();
            return { status: 200, message: 'Data successfully removed' };
        }
        catch (error) {
            console.error('Remove error:', error);
            return { status: 500, message: `Error removing data: ${error.message}` };
        }
    }
    async get(path) {
        try {
            const ref = this.getRef(path);
            const snapshot = await ref.get();
            const data = snapshot.val();
            return {
                status: 200,
                message: 'Data successfully retrieved',
                data: data,
            };
        }
        catch (error) {
            console.error('Get error:', error);
            return {
                status: 500,
                message: `Error retrieving data: ${error.message}`,
            };
        }
    }
    getRef(path) {
        return this.database.ref(path);
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map