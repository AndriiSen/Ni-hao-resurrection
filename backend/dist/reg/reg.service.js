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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const reg_schema_1 = require("./schemas/reg.schema");
const mongoose_2 = require("mongoose");
const argon2 = require("argon2");
let RegService = class RegService {
    constructor(regModel) {
        this.regModel = regModel;
        this.users = [];
    }
    async getAllUsers() {
        return this.regModel.find().exec();
    }
    async create(createDto) {
        const newReg = new this.regModel(Object.assign(Object.assign({}, createDto), { date: new Date().toString(), password: await argon2.hash('password') }));
        return newReg.save();
    }
    async removeUsers() {
        return this.regModel.remove({});
    }
};
RegService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reg_schema_1.Reg.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RegService);
exports.RegService = RegService;
//# sourceMappingURL=reg.service.js.map