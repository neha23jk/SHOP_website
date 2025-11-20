// FlashMart Products Data
// Contains 30+ products across multiple categories

const productImage = (fileName) => `assets/Products/${fileName}`;

const FLASHMART_PRODUCTS_VERSION = '2024-11-20-a';

const FLASHMART_PRODUCTS = [
  // Groceries
  {
    id: 1,
    name: "Amul Full Cream Milk 1L",
    category: "groceries",
    price: 58,
    images: [productImage("Amul Full Cream Milk 1L.png")],
    description: "Fresh full cream milk, 1 liter pack. Rich in calcium and protein.",
    stock: 50,
    rating: 4.5
  },
  {
    id: 2,
    name: "Britannia Bread White 400g",
    category: "groceries",
    price: 45,
    images: [productImage("Britannia Bread White 400gm.png")],
    description: "Soft white bread, perfect for breakfast and snacks.",
    stock: 30,
    rating: 4.3
  },
  {
    id: 3,
    name: "Fortune Sunflower Oil 1L",
    category: "groceries",
    price: 145,
    images: [productImage("Fortune Sunflower Oil 1L.png")],
    description: "Pure sunflower oil for cooking. Heart-healthy option.",
    stock: 25,
    rating: 4.4
  },
  {
    id: 4,
    name: "Tata Salt Iodized 1kg",
    category: "groceries",
    price: 28,
    images: [productImage("Tata Salt Iodized 1kg.png")],
    description: "Iodized table salt. Essential for daily cooking.",
    stock: 100,
    rating: 4.6
  },
  {
    id: 5,
    name: "Basmati Rice 1kg",
    category: "groceries",
    price: 120,
    images: [productImage("Basmati Rice 1kg.png")],
    description: "Premium long grain basmati rice. Aromatic and fluffy.",
    stock: 40,
    rating: 4.7
  },
  {
    id: 6,
    name: "Red Onions 1kg",
    category: "groceries",
    price: 35,
    images: [productImage("Red Onions 1kg.png")],
    description: "Fresh red onions. Locally sourced, farm fresh.",
    stock: 60,
    rating: 4.2
  },
  {
    id: 7,
    name: "Tomatoes 1kg",
    category: "groceries",
    price: 40,
    images: [productImage("Tomatoes 1kg.png")],
    description: "Fresh red tomatoes. Perfect for salads and cooking.",
    stock: 55,
    rating: 4.3
  },
  {
    id: 8,
    name: "Potatoes 1kg",
    category: "groceries",
    price: 30,
    images: [productImage("Potatoes 1kg.png")],
    description: "Fresh potatoes. Versatile vegetable for all cuisines.",
    stock: 70,
    rating: 4.1
  },

  // Snacks
  {
    id: 9,
    name: "Lays Classic Salted 70g",
    category: "snacks",
    price: 20,
    images: [productImage("Lays Classic Salted 70g.png")],
    description: "Crunchy potato chips with classic salted flavor.",
    stock: 80,
    rating: 4.5
  },
  {
    id: 10,
    name: "Cadbury Dairy Milk 80g",
    category: "snacks",
    price: 55,
    images: [productImage("Cadbury Dairy Milk 80g.png")],
    description: "Smooth and creamy milk chocolate bar.",
    stock: 45,
    rating: 4.8
  },
  {
    id: 11,
    name: "Parle-G Glucose Biscuits 200g",
    category: "snacks",
    price: 15,
    images: [productImage("Parle-G Glucose Biscuits 200g.png")],
    description: "Classic glucose biscuits. Perfect with tea.",
    stock: 90,
    rating: 4.4
  },
  {
    id: 12,
    name: "Kurkure Masala Munch 70g",
    category: "snacks",
    price: 20,
    images: [productImage("Kurkure Masala Munch 70g.png")],
    description: "Crunchy and spicy corn puffs. Bold masala flavor.",
    stock: 65,
    rating: 4.3
  },
  {
    id: 13,
    name: "Oreo Cookies 137g",
    category: "snacks",
    price: 45,
    images: [productImage("Oreo Cookies 137g.png")],
    description: "Cream-filled chocolate cookies. Classic favorite.",
    stock: 50,
    rating: 4.6
  },
  {
    id: 14,
    name: "Haldiram's Namkeen 200g",
    category: "snacks",
    price: 85,
    images: [productImage("Haldiram's Namkeen 200gm.png")],
    description: "Traditional Indian savory snacks. Assorted flavors.",
    stock: 35,
    rating: 4.5
  },

  // Personal Care
  {
    id: 15,
    name: "Dove Soap 125g",
    category: "personal-care",
    price: 65,
    images: [productImage("Dove Soap 125g.png")],
    description: "Moisturizing beauty bar. Gentle on skin.",
    stock: 40,
    rating: 4.6
  },
  {
    id: 16,
    name: "Colgate Toothpaste 200g",
    category: "personal-care",
    price: 95,
    images: [productImage("Colgate Toothpaste 200g.png")],
    description: "Advanced whitening toothpaste. Fresh breath guarantee.",
    stock: 55,
    rating: 4.5
  },
  {
    id: 17,
    name: "Pantene Shampoo 340ml",
    category: "personal-care",
    price: 185,
    images: [productImage("Pantene Shampoo 340ml.png")],
    description: "Smooth and silky hair care shampoo. For all hair types.",
    stock: 30,
    rating: 4.4
  },
  {
    id: 18,
    name: "Gillette Razor Blade 4pc",
    category: "personal-care",
    price: 245,
    images: [productImage("Gillette Razor Blade 4pc.png")],
    description: "Ultra-sharp razor blades. Smooth shaving experience.",
    stock: 25,
    rating: 4.3
  },
  {
    id: 19,
    name: "Lakme Face Cream 50g",
    category: "personal-care",
    price: 125,
    images: [productImage("Lakme Face Cream 50g.png")],
    description: "Moisturizing face cream. SPF protection included.",
    stock: 35,
    rating: 4.2
  },
  {
    id: 20,
    name: "Nivea Deodorant 150ml",
    category: "personal-care",
    price: 165,
    images: [productImage("Nivea Deodorant 150ml.png")],
    description: "Long-lasting deodorant. Fresh fragrance all day.",
    stock: 28,
    rating: 4.5
  },

  // Electronics Accessories
  {
    id: 21,
    name: "USB Type-C Cable 1m",
    category: "electronics",
    price: 299,
    images: [productImage("USB Type-C Cable 1m.png")],
    description: "Fast charging USB-C cable. Compatible with all devices.",
    stock: 45,
    rating: 4.4
  },
  {
    id: 22,
    name: "Wireless Mouse",
    category: "electronics",
    price: 599,
    images: [productImage("Wireless Mouse.png")],
    description: "Ergonomic wireless mouse. 2.4GHz connectivity.",
    stock: 30,
    rating: 4.3
  },
  {
    id: 23,
    name: "Phone Stand Adjustable",
    category: "electronics",
    price: 249,
    images: [productImage("Phone Stand Adjustable.png")],
    description: "Adjustable phone stand. Supports all smartphone sizes.",
    stock: 50,
    rating: 4.5
  },
  {
    id: 24,
    name: "Bluetooth Earbuds",
    category: "electronics",
    price: 899,
    images: [productImage("Bluetooth Earbuds.png")],
    description: "True wireless earbuds. 20hr battery life.",
    stock: 20,
    rating: 4.2
  },
  {
    id: 25,
    name: "Power Bank 10000mAh",
    category: "electronics",
    price: 799,
    images: [productImage("Power Bank 10000mAh.png")],
    description: "Fast charging power bank. Multiple device support.",
    stock: 25,
    rating: 4.6
  },
  {
    id: 26,
    name: "HDMI Cable 2m",
    category: "electronics",
    price: 349,
    images: [productImage("HDMI Cable 2m.png")],
    description: "High-speed HDMI cable. 4K video support.",
    stock: 35,
    rating: 4.4
  },
  {
    id: 27,
    name: "Laptop Cooling Pad",
    category: "electronics",
    price: 649,
    images: [productImage("Laptop Cooling Pad.png")],
    description: "USB-powered cooling pad. Adjustable height.",
    stock: 15,
    rating: 4.3
  },

  // Stationery
  {
    id: 28,
    name: "Classmate Notebook 200 pages",
    category: "stationery",
    price: 85,
    images: [productImage("Classmate Notebook 200 Pages.png")],
    description: "Ruled notebook. 200 pages, premium quality paper.",
    stock: 60,
    rating: 4.5
  },
  {
    id: 29,
    name: "Reynolds Ball Pen Pack of 10",
    category: "stationery",
    price: 75,
    images: [productImage("Reynolds Ball Pen Pack of 10.png")],
    description: "Smooth writing ball pens. Blue ink, pack of 10.",
    stock: 70,
    rating: 4.4
  },
  {
    id: 30,
    name: "Staedtler Pencil Set 12pc",
    category: "stationery",
    price: 125,
    images: [productImage("Staedtler Pencil Set 12pc.png")],
    description: "Professional drawing pencils. Various hardness grades.",
    stock: 40,
    rating: 4.6
  },
  {
    id: 31,
    name: "Sticky Notes 5 packs",
    category: "stationery",
    price: 95,
    images: [productImage("Sticky Notes 5 packs.png")],
    description: "Colorful sticky notes. 5 assorted color packs.",
    stock: 55,
    rating: 4.3
  },
  {
    id: 32,
    name: "A4 Copy Paper 500 sheets",
    category: "stationery",
    price: 199,
    images: [productImage("A4 Copy Paper 500 Sheets.png")],
    description: "Premium A4 copy paper. 75 GSM, white.",
    stock: 30,
    rating: 4.5
  },

  // Home Essentials
  {
    id: 33,
    name: "Scotch Brite Scrub Pad",
    category: "home-essentials",
    price: 25,
    images: [productImage("Scotch Brite Scrub Pad.png")],
    description: "Non-scratch scrub pad. For kitchen cleaning.",
    stock: 80,
    rating: 4.4
  },
  {
    id: 34,
    name: "Vim Dishwash Gel 500ml",
    category: "home-essentials",
    price: 95,
    images: [productImage("Vim Dishwah Gel 500ml.png")],
    description: "Powerful dishwashing gel. Removes tough grease.",
    stock: 45,
    rating: 4.5
  },
  {
    id: 35,
    name: "Harpic Toilet Cleaner 1L",
    category: "home-essentials",
    price: 125,
    images: [productImage("Harpic Toilet Cleaner 1L.png")],
    description: "Effective toilet cleaner. Kills 99.9% germs.",
    stock: 35,
    rating: 4.3
  },
  {
    id: 36,
    name: "Tissue Paper Box 200 sheets",
    category: "home-essentials",
    price: 65,
    images: [productImage("Tissue Paper Box 200 Sheets.png")],
    description: "Soft tissue paper. 2-ply, 200 sheets per box.",
    stock: 50,
    rating: 4.2
  },
  {
    id: 37,
    name: "Dettol Hand Sanitizer 200ml",
    category: "home-essentials",
    price: 85,
    images: [productImage("Dettol Hand Sanitizer 200ml.png")],
    description: "Antibacterial hand sanitizer. 99.9% germ protection.",
    stock: 60,
    rating: 4.6
  },
  {
    id: 38,
    name: "LED Bulb 9W White",
    category: "home-essentials",
    price: 149,
    images: [productImage("LED Bulb 9W White.png")],
    description: "Energy-efficient LED bulb. Bright white light.",
    stock: 40,
    rating: 4.4
  }
];

// Initialize products in localStorage if not already present
if (typeof Storage !== 'undefined') {
  const storedVersion = localStorage.getItem('flashmart_products_version');
  if (!localStorage.getItem('flashmart_products') || storedVersion !== FLASHMART_PRODUCTS_VERSION) {
    localStorage.setItem('flashmart_products', JSON.stringify(FLASHMART_PRODUCTS));
    localStorage.setItem('flashmart_products_version', FLASHMART_PRODUCTS_VERSION);
  }
}


