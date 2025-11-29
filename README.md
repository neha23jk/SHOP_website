# College-Work
##

# FlashMart - Fast Local Shopping Website

FlashMart is a fully functional e-commerce website built with pure HTML, CSS, and JavaScript. It simulates a local store similar to Blinkit or Flipkart Minutes, with all functionality working client-side using localStorage for data persistence.

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, Grid, and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript with no dependencies
- **LocalStorage API**: Client-side data persistence

## Features

- 🛒 **Complete Shopping Experience**: Browse products, add to cart, and checkout
- 🔍 **Search & Filter**: Real-time search with category and price filters
- 👤 **User Authentication**: Login/Register system with user-specific carts and orders
- 💳 **Payment Options**: Direct payment or monthly billing system
- 📦 **Order Management**: View order history and track orders
- 💰 **Monthly Billing**: Add orders to monthly account and pay at month-end
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🎨 **Modern UI**: Clean, Blinkit-inspired interface with smooth animations

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

## Website Link (Live Demo):-
- https://neha23jk.github.io/SHOP_website/

## Test Account (Use this preconfigured account for testing):-
- Email: test@flashmart.com
- Password: Password123

## How to run Locally

1. Download or clone the project files
2. Open `index.html` in your web browser
3. That's it! The website will work immediately

##
##

### Submitted by: Neha Chaudhary
### Student ID: 2024KUEC2043
### Batch: C2
