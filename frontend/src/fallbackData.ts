export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export const fallbackSweets: Sweet[] = [
  { id: 101, name: 'Anjeer Barfi', category: 'Sugar Free', price: 22.00, quantity: 50 },
  { id: 102, name: 'Date Rolls', category: 'Sugar Free', price: 20.00, quantity: 60 },
  { id: 103, name: 'Jelly Bean', category: 'Sugar Free', price: 20.00, quantity: 100 },
  { id: 104, name: 'Besan Ladoo', category: 'Packed Sweets', price: 10.00, quantity: 100 },
  { id: 105, name: 'Milk Cake', category: 'Packed Sweets', price: 18.00, quantity: 40 },
  { id: 106, name: 'Kaju Barfi', category: 'Packed Sweets', price: 20.00, quantity: 45 },
  { id: 107, name: 'Rasmalai', category: 'Special', price: 12.00, quantity: 30 },
  { id: 108, name: 'Baklava', category: 'Special', price: 30.00, quantity: 30 },
  { id: 109, name: 'Turkish Delight', category: 'Special', price: 25.00, quantity: 40 },
  { id: 110, name: 'Saffron Sandesh', category: 'Special', price: 15.00, quantity: 40 },
  { id: 111, name: 'Pista Barfi', category: 'Packed Sweets', price: 18.00, quantity: 50 },
  { id: 112, name: 'Chocolate Barfi', category: 'Packed Sweets', price: 18.00, quantity: 50 },
  { id: 113, name: 'Kesar Peda', category: 'Packed Sweets', price: 14.00, quantity: 60 },
  { id: 114, name: 'Malai Ghevar', category: 'Special', price: 25.00, quantity: 20 },
  { id: 115, name: 'Coconut Barfi', category: 'Packed Sweets', price: 16.00, quantity: 45 },
  { id: 116, name: 'Rajbhog', category: 'Special', price: 22.00, quantity: 30 }
];
