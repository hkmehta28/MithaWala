"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sweets_controller_1 = require("../controllers/sweets.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', sweets_controller_1.getAllSweets);
router.post('/', auth_middleware_1.authenticateToken, sweets_controller_1.addSweet); // User can add? Prompt says "Protected", imply User. Admin only for Delete/Restock.
router.put('/:id', auth_middleware_1.authenticateToken, sweets_controller_1.updateSweet);
router.delete('/:id', auth_middleware_1.authenticateToken, auth_middleware_1.requireAdmin, sweets_controller_1.deleteSweet);
// Inventory
const sweets_controller_2 = require("../controllers/sweets.controller");
router.post('/:id/purchase', auth_middleware_1.authenticateToken, sweets_controller_2.purchase);
router.post('/:id/restock', auth_middleware_1.authenticateToken, auth_middleware_1.requireAdmin, sweets_controller_2.restock);
exports.default = router;
