import { prisma } from '../app';

export const createSweet = async (data: any) => {
  return await prisma.sweet.create({ data });
};

export const getSweets = async (search?: string) => {
  if (search) {
    return await prisma.sweet.findMany({
      where: {
        OR: [
          { name: { contains: search } },
          { category: { contains: search } }
        ]
      }
    });
  }
  return await prisma.sweet.findMany();
};

export const updateSweetDetails = async (id: number, data: any) => {
  return await prisma.sweet.update({
    where: { id },
    data
  });
};

export const removeSweet = async (id: number) => {
  return await prisma.sweet.delete({
    where: { id }
  });
};

export const purchaseSweet = async (id: number, quantity: number) => {
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) throw new Error('Sweet not found');
  if (sweet.quantity < quantity) throw new Error('Insufficient quantity');
  
  return await prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity - quantity }
  });
};

export const restockSweet = async (id: number, quantity: number) => {
  return await prisma.sweet.update({
    where: { id },
    data: { quantity: { increment: quantity } }
  });
};
