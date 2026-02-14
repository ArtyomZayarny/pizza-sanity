/**
 * Dummy content for the pizza site. Run with: npx tsx scripts/seed.ts
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 */

export const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "Artisan Pizza",
  navLinks: [
    { _key: "1", _type: "navLink", label: "Home", href: "/" },
    { _key: "2", _type: "navLink", label: "Menu", href: "/menu" },
    { _key: "3", _type: "navLink", label: "Order", href: "/order" },
  ],
  heroHeading: "Handcrafted Pizza, Made to Order",
  heroSubheading:
    "Fresh ingredients, wood-fired oven, and decades of passion in every slice.",
  heroCtaText: "View menu",
  heroCtaLink: "/menu",
  contactAddress: "123 Main Street, Your City, ST 12345",
  contactPhone: "+1 (555) 123-4567",
  contactEmail: "hello@artisanpizza.example",
  openingHours: "Mon–Sun: 11:00 – 22:00",
  orderFormTitle: "Place your order",
  orderFormDescription:
    "Fill in your details and we'll get your order ready. Delivery and pickup available.",
  orderFormSuccessMessage:
    "Thank you! Your order has been received. We'll confirm by phone or email shortly.",
  formLabels: {
    nameLabel: "Your name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Delivery address",
    notesLabel: "Order notes",
  },
};

export const menuItems = [
  // Pizzas
  {
    _type: "menuItem",
    name: "Margherita",
    description: "Tomato, mozzarella, fresh basil, extra virgin olive oil.",
    price: 12,
    category: "pizza",
    order: 0,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "Pepperoni",
    description: "Classic pepperoni with mozzarella and our house tomato sauce.",
    price: 14,
    category: "pizza",
    order: 1,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, parmesan, and ricotta.",
    price: 15,
    category: "pizza",
    order: 2,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "Hawaiian",
    description: "Ham, pineapple, mozzarella, and tomato sauce.",
    price: 14,
    category: "pizza",
    order: 3,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "BBQ Chicken",
    description: "Grilled chicken, BBQ sauce, red onion, cilantro.",
    price: 16,
    category: "pizza",
    order: 4,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "Veggie",
    description: "Bell peppers, mushrooms, olives, onions, tomato.",
    price: 13,
    category: "pizza",
    order: 5,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "Diavola",
    description: "Spicy salami, mozzarella, chili oil.",
    price: 15,
    category: "pizza",
    order: 6,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "Funghi",
    description: "Mixed mushrooms, garlic, thyme, mozzarella.",
    price: 14,
    category: "pizza",
    order: 7,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "Capricciosa",
    description: "Ham, mushrooms, artichokes, olives, mozzarella.",
    price: 16,
    category: "pizza",
    order: 8,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "Marinara",
    description: "Tomato, garlic, oregano, olive oil. No cheese.",
    price: 10,
    category: "pizza",
    order: 9,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "White Pizza",
    description: "Ricotta, mozzarella, garlic, olive oil.",
    price: 14,
    category: "pizza",
    order: 10,
    sizes: [
      { _key: "s", name: "Small", priceModifier: 0 },
      { _key: "m", name: "Medium", priceModifier: 2 },
      { _key: "l", name: "Large", priceModifier: 4 },
    ],
  },
  {
    _type: "menuItem",
    name: "Calzone",
    description: "Folded pizza with ham, ricotta, mozzarella, tomato.",
    price: 14,
    category: "pizza",
    order: 11,
  },
  // Drinks
  { _type: "menuItem", name: "Cola", description: "330ml", price: 3, category: "drinks", order: 20 },
  { _type: "menuItem", name: "Lemonade", description: "Fresh squeezed, 330ml", price: 4, category: "drinks", order: 21 },
  { _type: "menuItem", name: "Iced Tea", description: "Peach or lemon, 330ml", price: 3.5, category: "drinks", order: 22 },
  { _type: "menuItem", name: "Sparkling Water", description: "500ml", price: 2.5, category: "drinks", order: 23 },
  { _type: "menuItem", name: "Beer", description: "Local draft, 500ml", price: 5, category: "drinks", order: 24 },
  { _type: "menuItem", name: "Wine", description: "House red or white, glass", price: 6, category: "drinks", order: 25 },
  { _type: "menuItem", name: "Juice", description: "Orange or apple, 250ml", price: 3.5, category: "drinks", order: 26 },
  { _type: "menuItem", name: "Coffee", description: "Espresso, americano, or cappuccino", price: 3, category: "drinks", order: 27 },
  // Sides
  { _type: "menuItem", name: "Garlic Bread", description: "Toasted with garlic butter and herbs.", price: 5, category: "sides", order: 30 },
  { _type: "menuItem", name: "Fries", description: "Crispy seasoned fries with dipping sauce.", price: 4, category: "sides", order: 31 },
  { _type: "menuItem", name: "House Salad", description: "Mixed greens, cherry tomatoes, vinaigrette.", price: 6, category: "sides", order: 32 },
  { _type: "menuItem", name: "Chicken Wings", description: "6 pcs, buffalo or BBQ.", price: 8, category: "sides", order: 33 },
  { _type: "menuItem", name: "Mozzarella Sticks", description: "6 pcs with marinara.", price: 6, category: "sides", order: 34 },
  { _type: "menuItem", name: "Breadsticks", description: "Soft breadsticks with marinara.", price: 4.5, category: "sides", order: 35 },
  // Desserts
  { _type: "menuItem", name: "Tiramisu", description: "Classic Italian dessert.", price: 7, category: "desserts", order: 40 },
  { _type: "menuItem", name: "Brownie", description: "Chocolate brownie with ice cream.", price: 6, category: "desserts", order: 41 },
  { _type: "menuItem", name: "Ice Cream", description: "Two scoops, choice of flavor.", price: 5, category: "desserts", order: 42 },
  { _type: "menuItem", name: "Cannoli", description: "Sicilian cannoli, two pieces.", price: 6.5, category: "desserts", order: 43 },
  { _type: "menuItem", name: "Panna Cotta", description: "Vanilla panna cotta with berry sauce.", price: 7, category: "desserts", order: 44 },
];
