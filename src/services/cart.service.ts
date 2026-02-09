export interface CartItem {
  seanceId: number;
  spectacleTitre: string;
  dateHeure?: string;
  salleNom?: string;
  unitPrice: number; // in euros
  quantity: number;
}

const STORAGE_KEY = 'ticknet_cart_v1';

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch (e) {
    console.error('Failed to load cart', e);
    return [];
  }
}

function save(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart', e);
  }
}

export const CartService = {
  getCart(): CartItem[] {
    return load();
  },

  addItem(item: CartItem) {
    const items = load();
    const existing = items.find(i => i.seanceId === item.seanceId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push(item);
    }
    save(items);
  },

  updateQuantity(seanceId: number, quantity: number) {
    const items = load();
    const idx = items.findIndex(i => i.seanceId === seanceId);
    if (idx === -1) return;
    items[idx].quantity = Math.max(1, quantity);
    save(items);
  },

  removeItem(seanceId: number) {
    let items = load();
    items = items.filter(i => i.seanceId !== seanceId);
    save(items);
  },

  clear() {
    save([]);
  }
}
