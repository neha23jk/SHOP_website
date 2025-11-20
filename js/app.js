// FlashMart - Main Application JavaScript
// Handles storage, cart management, authentication, and shared utilities

// ============================================================================
// STORAGE UTILITIES
// ============================================================================

const FlashMartStorage = {
  // Get all products from localStorage
  getProducts() {
    const products = localStorage.getItem('flashmart_products');
    return products ? JSON.parse(products) : [];
  },

  // Get product by ID
  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === parseInt(id));
  },

  // Search products by query
  searchProducts(query) {
    const products = this.getProducts();
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  },

  // Get products by category
  getProductsByCategory(category) {
    const products = this.getProducts();
    return category === 'all' ? products : products.filter(p => p.category === category);
  },

  // ============================================================================
  // USER MANAGEMENT
  // ============================================================================

  // Get all users
  getUsers() {
    const users = localStorage.getItem('flashmart_users');
    return users ? JSON.parse(users) : [];
  },

  // Get current user
  getCurrentUser() {
    const userJson = localStorage.getItem('flashmart_currentUser');
    return userJson ? JSON.parse(userJson) : null;
  },

  // Set current user
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem('flashmart_currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('flashmart_currentUser');
    }
  },

  // Register new user
  registerUser(email, password, name) {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = {
      id: Date.now(),
      email,
      password, // In production, hash this password
      name,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('flashmart_users', JSON.stringify(users));
    return { success: true, user: newUser };
  },

  // Login user
  loginUser(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'Invalid email or password' };
  },

  // Logout user
  logoutUser() {
    this.setCurrentUser(null);
  },

  // Get user ID (for guest users, use 'guest')
  getUserId() {
    const user = this.getCurrentUser();
    return user ? user.id : 'guest';
  },

  // ============================================================================
  // CART MANAGEMENT
  // ============================================================================

  // Get cart for current user
  getCart() {
    const userId = this.getUserId();
    const cartKey = `flashmart_cart_${userId}`;
    const cart = localStorage.getItem(cartKey);
    return cart ? JSON.parse(cart) : [];
  },

  // Save cart for current user
  saveCart(cart) {
    const userId = this.getUserId();
    const cartKey = `flashmart_cart_${userId}`;
    localStorage.setItem(cartKey, JSON.stringify(cart));
  },

  // Add item to cart
  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    if (product.stock < quantity) {
      return { success: false, message: 'Insufficient stock' };
    }

    const cart = this.getCart();
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        return { success: false, message: 'Insufficient stock' };
      }
      existingItem.quantity = newQuantity;
    } else {
      cart.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart(cart);
    return { success: true, message: 'Added to cart' };
  },

  // Update cart item quantity
  updateCartQuantity(productId, quantity) {
    const product = this.getProductById(productId);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    if (quantity > product.stock) {
      return { success: false, message: 'Insufficient stock' };
    }

    const cart = this.getCart();
    const item = cart.find(item => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId);
      }
      item.quantity = quantity;
      this.saveCart(cart);
      return { success: true, message: 'Cart updated' };
    }
    return { success: false, message: 'Item not in cart' };
  },

  // Remove item from cart
  removeFromCart(productId) {
    const cart = this.getCart();
    const filteredCart = cart.filter(item => item.productId !== productId);
    this.saveCart(filteredCart);
    return { success: true, message: 'Removed from cart' };
  },

  // Clear cart
  clearCart() {
    this.saveCart([]);
  },

  // Get cart total
  getCartTotal() {
    const cart = this.getCart();
    let total = 0;
    cart.forEach(item => {
      const product = this.getProductById(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    });
    return total;
  },

  // Get cart item count
  getCartItemCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // ============================================================================
  // ORDERS MANAGEMENT
  // ============================================================================

  // Get orders for current user
  getOrders() {
    const userId = this.getUserId();
    const ordersKey = `flashmart_orders_${userId}`;
    const orders = localStorage.getItem(ordersKey);
    return orders ? JSON.parse(orders) : [];
  },

  // Create new order
  createOrder(cart, paymentMethod, paid = true) {
    const userId = this.getUserId();
    const ordersKey = `flashmart_orders_${userId}`;
    const orders = this.getOrders();

    const order = {
      id: Date.now(),
      items: cart.map(item => {
        const product = this.getProductById(item.productId);
        return {
          productId: item.productId,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.images[0]
        };
      }),
      total: this.getCartTotal(),
      paymentMethod,
      paid,
      status: paid ? 'completed' : 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
    };

    orders.unshift(order); // Add to beginning
    localStorage.setItem(ordersKey, JSON.stringify(orders));

    // If monthly payment, add to monthly account
    if (paymentMethod === 'monthly' && userId !== 'guest') {
      this.addToMonthlyAccount(order);
    }

    // Clear cart after order
    this.clearCart();

    return order;
  },

  // ============================================================================
  // MONTHLY BILLING
  // ============================================================================

  // Get monthly account for current user
  getMonthlyAccount() {
    const userId = this.getUserId();
    if (userId === 'guest') {
      return { outstanding: 0, orders: [] };
    }
    const monthlyKey = `flashmart_monthly_${userId}`;
    const monthly = localStorage.getItem(monthlyKey);
    return monthly ? JSON.parse(monthly) : { outstanding: 0, orders: [] };
  },

  // Add order to monthly account
  addToMonthlyAccount(order) {
    const userId = this.getUserId();
    if (userId === 'guest') return;
    const monthlyKey = `flashmart_monthly_${userId}`;
    const monthly = this.getMonthlyAccount();
    monthly.outstanding += order.total;
    monthly.orders.push(order.id);
    localStorage.setItem(monthlyKey, JSON.stringify(monthly));
  },

  // Pay monthly balance
  payMonthlyBalance() {
    const userId = this.getUserId();
    if (userId === 'guest') {
      return { success: false, message: 'Guest users cannot use monthly billing' };
    }
    const monthlyKey = `flashmart_monthly_${userId}`;
    const monthly = this.getMonthlyAccount();
    
    if (monthly.outstanding <= 0) {
      return { success: false, message: 'No outstanding balance' };
    }

    // Mark all unpaid orders as paid
    const orders = this.getOrders();
    monthly.orders.forEach(orderId => {
      const order = orders.find(o => o.id === orderId);
      if (order && !order.paid) {
        order.paid = true;
        order.status = 'completed';
      }
    });

    const paidAmount = monthly.outstanding;
    monthly.outstanding = 0;
    monthly.orders = [];
    
    localStorage.setItem(monthlyKey, JSON.stringify(monthly));
    localStorage.setItem(`flashmart_orders_${userId}`, JSON.stringify(orders));

    return { success: true, message: `Payment of ₹${paidAmount} processed`, amount: paidAmount };
  },

  // ============================================================================
  // UI UTILITIES
  // ============================================================================

  // Show toast notification
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // Format price
  formatPrice(price) {
    return `₹${price.toFixed(2)}`;
  },

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Update cart badge in header
  updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = this.getCartItemCount();
      badge.textContent = count;
      if (count > 0) {
        badge.classList.add('show');
      } else {
        badge.classList.remove('show');
      }
    }
    // Update mobile mini cart
    this.updateMobileMiniCart();
  },

  // Update user info in header
  updateUserInfo() {
    const user = this.getCurrentUser();
    const userInfo = document.getElementById('user-info');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (user) {
      if (userInfo) userInfo.textContent = user.name || user.email;
      if (loginBtn) loginBtn.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'inline-block';
    } else {
      if (userInfo) userInfo.textContent = 'Guest';
      if (loginBtn) loginBtn.style.display = 'inline-block';
      if (logoutBtn) logoutBtn.style.display = 'none';
    }
  },

  // Fly to cart animation
  animateAddToCart(productId, buttonElement) {
    const product = this.getProductById(productId);
    if (!product || !buttonElement) return;

    const buttonRect = buttonElement.getBoundingClientRect();
    const cartBtn = document.querySelector('.cart-btn');
    if (!cartBtn) return;

    const cartRect = cartBtn.getBoundingClientRect();
    
    // Create flying element
    const flyElement = document.createElement('div');
    flyElement.className = 'fly-to-cart';
    flyElement.innerHTML = `<img src="${product.images[0]}" alt="${product.name}">`;
    
    // Set initial position
    flyElement.style.left = buttonRect.left + buttonRect.width / 2 + 'px';
    flyElement.style.top = buttonRect.top + buttonRect.height / 2 + 'px';
    
    // Calculate fly distance
    const flyX = cartRect.left + cartRect.width / 2 - (buttonRect.left + buttonRect.width / 2);
    const flyY = cartRect.top + cartRect.height / 2 - (buttonRect.top + buttonRect.height / 2);
    
    flyElement.style.setProperty('--fly-x', flyX + 'px');
    flyElement.style.setProperty('--fly-y', flyY + 'px');
    
    document.body.appendChild(flyElement);
    
    // Remove after animation
    setTimeout(() => {
      flyElement.remove();
      // Animate cart badge
      const badge = document.getElementById('cart-badge');
      if (badge) {
        badge.style.animation = 'none';
        setTimeout(() => {
          badge.style.animation = 'cartBounce 0.5s ease';
        }, 10);
      }
    }, 800);
  },

  // Update mobile mini cart
  updateMobileMiniCart() {
    const miniCart = document.getElementById('mobile-mini-cart');
    if (!miniCart) return;

    const cart = this.getCart();
    const total = this.getCartTotal();
    const itemCount = this.getCartItemCount();

    if (itemCount > 0) {
      miniCart.style.display = 'block';
      const totalEl = miniCart.querySelector('.mobile-mini-cart-total');
      const itemsEl = miniCart.querySelector('.mobile-mini-cart-items');
      if (totalEl) totalEl.textContent = `Total: ${this.formatPrice(total)}`;
      if (itemsEl) itemsEl.textContent = `${itemCount} item${itemCount > 1 ? 's' : ''} in cart`;
    } else {
      miniCart.style.display = 'none';
    }
  }
};

function initParticleField() {
  if (document.querySelector('.particle-field')) return;
  const field = document.createElement('div');
  field.className = 'particle-field';
  const particleCount = window.innerWidth > 1200 ? 60 : window.innerWidth > 768 ? 42 : 32;
  const palette = ['green', 'gold', 'mint', 'peach', 'lavender', 'aqua', 'sun', 'white'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('span');
    const variant = palette[Math.floor(Math.random() * palette.length)];
    if (variant !== 'white') {
      particle.dataset.variant = variant;
    }

    const left = Math.random() * 120 - 10;
    const top = Math.random() * 120 - 10;

    const startX = (Math.random() * 2 - 1) * 80;
    const startY = (Math.random() * 2 - 1) * 60;
    const midX = (Math.random() * 2 - 1) * 140;
    const midY = (Math.random() * 2 - 1) * 120;
    const endX = (Math.random() * 2 - 1) * 180;
    const endY = (Math.random() * 2 - 1) * 200;

    const startScale = 0.4 + Math.random() * 0.4;
    const midScale = startScale + 0.3 + Math.random() * 0.2;
    const endScale = midScale + 0.2;

    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.setProperty('--start-x', `${startX}px`);
    particle.style.setProperty('--start-y', `${startY}px`);
    particle.style.setProperty('--mid-x', `${midX}px`);
    particle.style.setProperty('--mid-y', `${midY}px`);
    particle.style.setProperty('--end-x', `${endX}px`);
    particle.style.setProperty('--end-y', `${endY}px`);
    particle.style.setProperty('--start-scale', startScale.toFixed(2));
    particle.style.setProperty('--mid-scale', midScale.toFixed(2));
    particle.style.setProperty('--end-scale', endScale.toFixed(2));
    particle.style.setProperty('--duration', `${6 + Math.random() * 8}s`);
    particle.style.animationDelay = `${Math.random() * 6}s`;

    field.appendChild(particle);
  }

  document.body.prepend(field);
}

function initCustomCursor() {
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (isCoarse) return;
  if (document.querySelector('.cursor-dot') || document.querySelector('.cursor-ring')) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add('custom-cursor-enabled');

  let visible = false;
  const updateVisibility = (show) => {
    const opacity = show ? 1 : 0;
    dot.style.opacity = opacity;
    ring.style.opacity = opacity;
    visible = show;
  };

  const moveCursor = (event) => {
    const { clientX, clientY } = event;
    dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    ring.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    if (!visible) updateVisibility(true);
  };

  document.addEventListener('pointermove', moveCursor);
  document.addEventListener('pointerdown', () => ring.classList.add('cursor-active'));
  document.addEventListener('pointerup', () => ring.classList.remove('cursor-active'));
  document.addEventListener('mouseleave', () => updateVisibility(false));
  document.addEventListener('mouseenter', () => updateVisibility(true));

  const interactiveSelector = 'a, button, .btn, .product-card, .category-card, input, select, textarea, .quantity-btn';
  document.addEventListener('mouseover', (event) => {
    if (event.target.closest(interactiveSelector)) {
      ring.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (event) => {
    if (!event.relatedTarget || !event.relatedTarget.closest(interactiveSelector)) {
      ring.classList.remove('cursor-hover');
    }
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize demo user on first load
document.addEventListener('DOMContentLoaded', () => {
  // Create demo user if it doesn't exist
  const users = FlashMartStorage.getUsers();
  const demoUser = users.find(u => u.email === 'test@flashmart.com');
  
  if (!demoUser) {
    FlashMartStorage.registerUser('test@flashmart.com', 'Password123', 'Test User');
    
    // Add some demo data for test user
    const testUser = FlashMartStorage.loginUser('test@flashmart.com', 'Password123');
    if (testUser.success) {
      // Add some demo orders
      const demoOrders = [
        {
          id: 1001,
          items: [
            { productId: 1, name: 'Amul Full Cream Milk 1L', price: 58, quantity: 2, image: 'assets/Products/Amul Full Cream Milk 1L.png' },
            { productId: 2, name: 'Britannia Bread White 400g', price: 45, quantity: 1, image: 'assets/Products/Britannia Bread White 400gm.png' }
          ],
          total: 161,
          paymentMethod: 'direct',
          paid: true,
          status: 'completed',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 1002,
          items: [
            { productId: 15, name: 'Dove Soap 125g', price: 65, quantity: 3, image: 'assets/Products/Dove Soap 125g.png' },
            { productId: 16, name: 'Colgate Toothpaste 200g', price: 95, quantity: 1, image: 'assets/Products/Colgate Toothpaste 200g.png' }
          ],
          total: 290,
          paymentMethod: 'monthly',
          paid: false,
          status: 'pending',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      localStorage.setItem(`flashmart_orders_${testUser.user.id}`, JSON.stringify(demoOrders));
      
      // Add monthly outstanding
      localStorage.setItem(`flashmart_monthly_${testUser.user.id}`, JSON.stringify({
        outstanding: 290,
        orders: [1002]
      }));
      
      FlashMartStorage.logoutUser(); // Logout after setup
    }
  }

  // Update UI elements if they exist
  FlashMartStorage.updateCartBadge();
  FlashMartStorage.updateUserInfo();

  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    });
  }

  // Add mobile mini cart HTML if on mobile
  if (window.innerWidth <= 768) {
    const miniCart = document.createElement('div');
    miniCart.id = 'mobile-mini-cart';
    miniCart.className = 'mobile-mini-cart';
    miniCart.innerHTML = `
      <div class="mobile-mini-cart-content">
        <div class="mobile-mini-cart-info">
          <div class="mobile-mini-cart-total">Total: ₹0.00</div>
          <div class="mobile-mini-cart-items">0 items in cart</div>
        </div>
        <a href="cart.html" class="mobile-mini-cart-btn">View Cart</a>
      </div>
    `;
    document.body.appendChild(miniCart);
    FlashMartStorage.updateMobileMiniCart();
  }

  initParticleField();
  initCustomCursor();
});

