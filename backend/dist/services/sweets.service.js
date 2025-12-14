"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restockSweet = exports.purchaseSweet = exports.removeSweet = exports.updateSweetDetails = exports.getSweets = exports.createSweet = void 0;
const app_1 = require("../app");
const createSweet = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield app_1.prisma.sweet.create({ data });
});
exports.createSweet = createSweet;
const getSweets = (search) => __awaiter(void 0, void 0, void 0, function* () {
    if (search) {
        return yield app_1.prisma.sweet.findMany({
            where: {
                OR: [
                    { name: { contains: search } },
                    { category: { contains: search } }
                ]
            }
        });
    }
    return yield app_1.prisma.sweet.findMany();
});
exports.getSweets = getSweets;
const updateSweetDetails = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield app_1.prisma.sweet.update({
        where: { id },
        data
    });
});
exports.updateSweetDetails = updateSweetDetails;
const removeSweet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield app_1.prisma.sweet.delete({
        where: { id }
    });
});
exports.removeSweet = removeSweet;
const purchaseSweet = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const sweet = yield app_1.prisma.sweet.findUnique({ where: { id } });
    if (!sweet)
        throw new Error('Sweet not found');
    if (sweet.quantity < quantity)
        throw new Error('Insufficient quantity');
    return yield app_1.prisma.sweet.update({
        where: { id },
        data: { quantity: sweet.quantity - quantity }
    });
});
exports.purchaseSweet = purchaseSweet;
const restockSweet = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    return yield app_1.prisma.sweet.update({
        where: { id },
        data: { quantity: { increment: quantity } }
    });
});
exports.restockSweet = restockSweet;
