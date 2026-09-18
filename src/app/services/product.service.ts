import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../components/product-card/product-card';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private allProducts: Product[] = [
    { id: '1', name: 'Rose Satin Midi Dress', category: 'Dresses', price: 9999, rating: 4.8, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80' },
    { id: '2', name: 'Elegant Evening Gown', category: 'Premium', price: 19999, discountPrice: 15999, rating: 5.0, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80' },
    { id: '3', name: 'Floral Summer Dress', category: 'Casual Wear', price: 6999, rating: 4.5, image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800&auto=format&fit=crop&q=80', isNew: true },
    { id: '4', name: 'Classic Wrap Top', category: 'Tops', price: 4599, discountPrice: 3599, rating: 4.7, image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&auto=format&fit=crop&q=80' },
    { id: '5', name: 'Burgundy Velvet Dress', category: 'Party Wear', price: 12999, rating: 4.9, image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&auto=format&fit=crop&q=80' },
    { id: '7', name: 'Striped Maxi Skirt Set', category: 'Premium', price: 9599, rating: 4.7, image: 'assets/IMG_6196.PNG', images: ['assets/IMG_6196.PNG', 'assets/IMG_6197.PNG', 'assets/IMG_6198.PNG', 'assets/IMG_6199.PNG'], isNew: true },
    { id: '11', name: 'Red Floral Anarkali Suit', category: 'Premium', price: 11999, discountPrice: 9999, rating: 4.9, image: 'assets/IMG_6200.PNG', images: ['assets/IMG_6200.PNG', 'assets/IMG_6201.PNG'], isNew: true },
    { id: '12', name: 'Purple Maxi Dress', category: 'Premium', price: 10999, discountPrice: 8999, rating: 4.8, image: 'assets/IMG_6202.PNG', images: ['assets/IMG_6202.PNG', 'assets/IMG_6203.PNG', 'assets/IMG_6204.PNG'], isNew: true }
  ];

  // State
  products = signal<Product[]>(this.allProducts);
  cart = signal<{product: Product, quantity: number, options?: any}[]>([]);
  wishlist = signal<Product[]>([]);

  cartTotal = computed(() => {
    return this.cart().reduce((total, item) => {
      const basePrice = item.product.discountPrice || item.product.price;
      let customCharge = 0;
      if (item.options) {
        if (item.options.fit && item.options.fit !== 'Regular') customCharge += 1500;
        if (item.options.length === 'Maxi') customCharge += 2000;
      }
      return total + ((basePrice + customCharge) * item.quantity);
    }, 0);
  });

  constructor() {}

  getProducts() {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.allProducts.find(p => p.id === id);
  }

  addToCart(product: Product, quantity: number = 1, options?: any) {
    this.cart.update(items => {
      const existing = items.find(i => i.product.id === product.id && JSON.stringify(i.options) === JSON.stringify(options));
      if (existing) {
        existing.quantity += quantity;
        return [...items];
      }
      return [...items, { product, quantity, options }];
    });
  }

  removeFromCart(index: number) {
    this.cart.update(items => {
      const newItems = [...items];
      newItems.splice(index, 1);
      return newItems;
    });
  }

  toggleWishlist(product: Product) {
    this.wishlist.update(items => {
      const exists = items.find(p => p.id === product.id);
      if (exists) {
        return items.filter(p => p.id !== product.id);
      }
      return [...items, product];
    });
  }
}
