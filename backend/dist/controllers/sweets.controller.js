"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.restock = exports.purchase = exports.deleteSweet = exports.updateSweet = exports.getAllSweets = exports.addSweet = void 0;
const sweets_service_1 = require("../services/sweets.service");
const addSweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sweet = yield (0, sweets_service_1.createSweet)(req.body);
        res.status(201).json(sweet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addSweet = addSweet;
const getAllSweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Search params
        const { search } = req.query;
        const sweets = yield (0, sweets_service_1.getSweets)(search);
        res.status(200).json(sweets);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllSweets = getAllSweets;
const updateSweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const sweet = yield (0, sweets_service_1.updateSweetDetails)(id, req.body);
        res.status(200).json(sweet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateSweet = updateSweet;
const deleteSweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield (0, sweets_service_1.removeSweet)(id);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteSweet = deleteSweet;
const purchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { quantity } = req.body;
        const sweet = yield Promise.resolve().then(() => __importStar(require('../services/sweets.service'))).then(s => s.purchaseSweet(id, quantity));
        res.status(200).json(sweet);
    }
    catch (error) {
        if (error.message === 'Insufficient quantity') {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.purchase = purchase;
const restock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { quantity } = req.body;
        const sweet = yield Promise.resolve().then(() => __importStar(require('../services/sweets.service'))).then(s => s.restockSweet(id, quantity));
        res.status(200).json(sweet);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.restock = restock;
