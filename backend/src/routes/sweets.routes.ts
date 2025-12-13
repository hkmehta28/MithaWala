import { Router } from 'express';
import { addSweet, getAllSweets, updateSweet, deleteSweet } from '../controllers/sweets.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAllSweets);
router.post('/', authenticateToken, addSweet); // User can add? Prompt says "Protected", imply User. Admin only for Delete/Restock.
router.put('/:id', authenticateToken, updateSweet);
router.delete('/:id', authenticateToken, requireAdmin, deleteSweet);

// Inventory
import { purchase, restock } from '../controllers/sweets.controller';
router.post('/:id/purchase', authenticateToken, purchase);
router.post('/:id/restock', authenticateToken, requireAdmin, restock);

export default router;
