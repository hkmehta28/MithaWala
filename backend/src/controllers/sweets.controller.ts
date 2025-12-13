import { Request, Response } from 'express';
import { createSweet, getSweets, updateSweetDetails, removeSweet } from '../services/sweets.service';

export const addSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await createSweet(req.body);
    res.status(201).json(sweet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllSweets = async (req: Request, res: Response) => {
  try {
    // Search params
    const { search } = req.query;
    const sweets = await getSweets(search as string);
    res.status(200).json(sweets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const sweet = await updateSweetDetails(id, req.body);
    res.status(200).json(sweet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await removeSweet(id);
    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const purchase = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const sweet = await import('../services/sweets.service').then(s => s.purchaseSweet(id, quantity));
    res.status(200).json(sweet);
  } catch (error: any) {
    if (error.message === 'Insufficient quantity') {
        res.status(400).json({ error: error.message });
    } else {
        res.status(500).json({ error: error.message });
    }
  }
};

export const restock = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const sweet = await import('../services/sweets.service').then(s => s.restockSweet(id, quantity));
    res.status(200).json(sweet);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
