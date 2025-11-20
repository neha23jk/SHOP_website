# FlashMart - Fast Local Shopping Website

FlashMart is a fully functional e-commerce website built with pure HTML, CSS, and JavaScript. It simulates a local store similar to Blinkit or Flipkart Minutes, with all functionality working client-side using localStorage for data persistence.

## Features

- 🛒 **Complete Shopping Experience**: Browse products, add to cart, and checkout
- 🔍 **Search & Filter**: Real-time search with category and price filters
- 👤 **User Authentication**: Login/Register system with user-specific carts and orders
- 💳 **Payment Options**: Direct payment or monthly billing system
- 📦 **Order Management**: View order history and track orders
- 💰 **Monthly Billing**: Add orders to monthly account and pay at month-end
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🎨 **Modern UI**: Clean, Blinkit-inspired interface with smooth animations

## File Structure

```
flashmart/
│
├── index.html          → Home page with hero, categories, and featured products
├── products.html       → Product listing with filters and search
├── product.html        → Individual product detail page
├── cart.html           → Shopping cart with quantity management
├── checkout.html       → Checkout and payment method selection
├── account.html        → User account, monthly billing, and order history
├── login.html          → User authentication (login/register)
│
├── css/
│   └── styles.css      → Main stylesheet with modern design
│
├── js/
│   └── app.js          → Core application logic and storage utilities
│
└── data/
    └── products.js     → Product data (30+ products)
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Installation

1. Download or clone the project files
2. Open `index.html` in your web browser
3. That's it! The website will work immediately

### Running Locally

Simply double-click `index.html` or open it in your browser. All functionality works offline using localStorage.

## Usage

### Test Account

A demo account is pre-configured for testing:

- **Email**: `test@flashmart.com`
- **Password**: `Password123`

This account includes:
- Sample order history
- Monthly outstanding balance
- Pre-configured data for testing

### Shopping Flow

1. **Browse Products**: Visit the home page or products page to browse items
2. **Search**: Use the search bar to find specific products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click the cart icon in the header to view your cart
5. **Checkout**: Click "Proceed to Checkout" to complete your order
6. **Payment**: Choose between direct payment or monthly billing
7. **View Orders**: Check your account page to see order history

### Payment Methods

#### Direct Payment
- Pay immediately with a simulated card payment
- Order is processed and marked as completed
- Suitable for one-time purchases

#### Monthly Billing
- Add orders to your monthly account
- Pay all outstanding balance at month-end
- Requires user login
- View monthly statement on account page

### User Features

- **Guest Shopping**: Browse and purchase without logging in (direct payment only)
- **Registered Users**: Access monthly billing, order history, and account management
- **Cart Persistence**: Cart is saved per user and persists across sessions
- **Order Tracking**: View all past orders with details and status

## Data Storage

All data is stored in browser localStorage using the following keys:

- `flashmart_products` - Product catalog
- `flashmart_users` - Registered user accounts
- `flashmart_currentUser` - Currently logged-in user
- `flashmart_cart_<userid>` - User's shopping cart
- `flashmart_orders_<userid>` - User's order history
- `flashmart_monthly_<userid>` - User's monthly billing account

### Clearing Data

To reset all data, open browser console and run:
```javascript
localStorage.clear();
```

Then refresh the page. The demo user will be recreated automatically.

## Product Categories

- **Groceries**: Milk, bread, oil, rice, vegetables, etc.
- **Snacks**: Chips, chocolates, biscuits, namkeen, etc.
- **Personal Care**: Soap, shampoo, toothpaste, deodorant, etc.
- **Electronics**: Cables, mouse, earbuds, power bank, etc.
- **Stationery**: Notebooks, pens, pencils, paper, etc.
- **Home Essentials**: Cleaning supplies, tissue, sanitizer, bulbs, etc.

## Testing Scenarios

### 1. Search Functionality
- Search for "milk" - should return milk products
- Search for "laptop" - should return electronics
- Test with category filters

### 2. Cart Management
- Add 3 items to cart
- Change quantities
- Remove an item
- Verify totals update correctly

### 3. Checkout & Payment
- Add items to cart
- Proceed to checkout
- Test direct payment (simulated)
- Test monthly billing (requires login)
- Verify order is created and stored

### 4. Monthly Billing
- Login with test account
- Place multiple orders with monthly payment
- Check monthly outstanding on account page
- Pay monthly balance
- Verify orders are marked as paid

### 5. User Authentication
- Register a new account
- Login with credentials
- Logout and verify cart is user-specific
- Test guest checkout

### 6. Buy Now Feature
- Click "Buy Now" on any product
- Should redirect to checkout with that product
- Complete payment and verify order

### 7. Stock Management
- Try to add more items than available stock
- Should show error message
- Verify stock limits are enforced

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, Grid, and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript with no dependencies
- **LocalStorage API**: Client-side data persistence

## Code Structure

### `js/app.js`
Contains all core functionality:
- `FlashMartStorage` object with methods for:
  - Product management
  - User authentication
  - Cart operations
  - Order management
  - Monthly billing
  - UI utilities

### `data/products.js`
- Product data array with 30+ items
- Automatically initializes localStorage on first load
- Each product includes: id, name, category, price, images, description, stock, rating

### `css/styles.css`
- CSS variables for theming
- Responsive grid layouts
- Modern animations and transitions
- Mobile-first design approach

## Customization

### Changing Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --primary-color: #00b4a6;
  --secondary-color: #ff6b35;
  --accent-color: #ffc107;
  /* ... */
}
```

### Adding Products
Edit `data/products.js` and add items to the `FLASHMART_PRODUCTS` array:
```javascript
{
  id: 39,
  name: "Product Name",
  category: "category-name",
  price: 100,
  images: ["image-url"],
  description: "Product description",
  stock: 50,
  rating: 4.5
}
```

### Modifying Categories
Update category names in:
- `data/products.js` (product categories)
- Navigation menu in all HTML files
- Category filter in `products.html`

## Security Notes

⚠️ **Important**: This is a demo application. In production:

1. **Never store passwords in plaintext** - Use proper hashing (bcrypt, etc.)
2. **Implement server-side validation** - All client-side validation can be bypassed
3. **Use HTTPS** - Protect data in transit
4. **Implement CSRF protection** - Prevent cross-site request forgery
5. **Use secure authentication** - JWT tokens, session management
6. **Validate all inputs** - Server-side validation is essential
7. **Implement rate limiting** - Prevent abuse
8. **Use a database** - localStorage is not suitable for production

## Known Limitations

- No real payment processing (simulated)
- No server-side validation
- No image upload functionality
- No email notifications
- No real-time inventory updates
- localStorage is browser-specific (not shared across devices)
- Data is lost if browser data is cleared

## Future Enhancements

- [ ] Real payment gateway integration
- [ ] Server-side API
- [ ] Database integration
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Admin panel
- [ ] Order tracking with delivery updates
- [ ] Multi-language support
- [ ] Dark mode toggle

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please check the code comments or refer to the browser console for debugging information.

## Credits

- Design inspired by Blinkit and Flipkart Minutes
- Built with vanilla JavaScript (no frameworks)
- All icons are SVG or emoji-based

---

**Enjoy shopping with FlashMart! 🛒✨**


"# SHOP_website" 
