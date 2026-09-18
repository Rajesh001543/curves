import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { ProductDetails } from './pages/product-details/product-details';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { OrderConfirmation } from './pages/order-confirmation/order-confirmation';
import { Wishlist } from './pages/wishlist/wishlist';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { Offers } from './pages/offers/offers';
import { SizeGuide } from './pages/size-guide/size-guide';
import { Returns } from './pages/returns/returns';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'new-arrivals', component: Shop },
  { path: 'collections', component: Shop },
  { path: 'offers', component: Offers },
  { path: 'category/:id', component: Shop },
  { path: 'product/:id', component: ProductDetails },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'order-confirmation', component: OrderConfirmation },
  { path: 'wishlist', component: Wishlist },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  { path: 'size-guide', component: SizeGuide },
  { path: 'returns', component: Returns },
  // Other routes will be added here
];
