require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");

const products = [
  {
    image: "https://picsum.photos/seed/urban-hoodie/800/1000",
    title: "Urban Fleece Hoodie",
    description: "Soft everyday hoodie with a relaxed fit for casual wear.",
    category: "men",
    brand: "nike",
    price: 3499,
    salePrice: 2799,
    totalStock: 18,
    averageReview: 4.4,
  },
  {
    image: "https://picsum.photos/seed/runner-tee/800/1000",
    title: "Runner Performance Tee",
    description: "Breathable training tee built for gym sessions and daily runs.",
    category: "men",
    brand: "adidas",
    price: 1999,
    salePrice: 1499,
    totalStock: 25,
    averageReview: 4.2,
  },
  {
    image: "https://picsum.photos/seed/summer-dress/800/1000",
    title: "Summer Flow Dress",
    description: "Lightweight printed dress with a flattering silhouette.",
    category: "women",
    brand: "zara",
    price: 4299,
    salePrice: 3699,
    totalStock: 14,
    averageReview: 4.6,
  },
  {
    image: "https://picsum.photos/seed/denim-jacket/800/1000",
    title: "Classic Denim Jacket",
    description: "Layer-ready denim jacket for all-season styling.",
    category: "women",
    brand: "levi",
    price: 4999,
    salePrice: 4299,
    totalStock: 12,
    averageReview: 4.5,
  },
  {
    image: "https://picsum.photos/seed/kids-sneakers/800/1000",
    title: "Kids Sprint Sneakers",
    description: "Lightweight sneakers with cushioned soles for active kids.",
    category: "kids",
    brand: "puma",
    price: 2599,
    salePrice: 2199,
    totalStock: 20,
    averageReview: 4.3,
  },
  {
    image: "https://picsum.photos/seed/kids-hoodie/800/1000",
    title: "Playtime Zip Hoodie",
    description: "Comfy zip hoodie made for school days and weekend outings.",
    category: "kids",
    brand: "h&m",
    price: 1899,
    salePrice: 1499,
    totalStock: 22,
    averageReview: 4.1,
  },
  {
    image: "https://picsum.photos/seed/leather-bag/800/1000",
    title: "Daily Carry Sling Bag",
    description: "Compact sling bag with organized compartments and clean styling.",
    category: "accessories",
    brand: "zara",
    price: 2299,
    salePrice: 1899,
    totalStock: 16,
    averageReview: 4.0,
  },
  {
    image: "https://picsum.photos/seed/sport-cap/800/1000",
    title: "Sport Cap",
    description: "Adjustable cap with sweat-wicking fabric for sunny days.",
    category: "accessories",
    brand: "nike",
    price: 1299,
    salePrice: 999,
    totalStock: 30,
    averageReview: 4.2,
  },
  {
    image: "https://picsum.photos/seed/street-shoes/800/1000",
    title: "Street Court Sneakers",
    description: "Clean low-top sneakers that work with jeans, joggers, or shorts.",
    category: "footwear",
    brand: "adidas",
    price: 5599,
    salePrice: 4899,
    totalStock: 10,
    averageReview: 4.7,
  },
  {
    image: "https://picsum.photos/seed/running-shoes/800/1000",
    title: "Velocity Running Shoes",
    description: "Responsive running shoes with extra cushioning and grip.",
    category: "footwear",
    brand: "puma",
    price: 6499,
    salePrice: 5799,
    totalStock: 11,
    averageReview: 4.8,
  },
  {
    image: "https://picsum.photos/seed/cotton-shirt/800/1000",
    title: "Cotton Everyday Shirt",
    description: "Smart-casual cotton shirt that pairs well with chinos and denim.",
    category: "men",
    brand: "h&m",
    price: 2399,
    salePrice: 1999,
    totalStock: 19,
    averageReview: 4.1,
  },
  {
    image: "https://picsum.photos/seed/active-leggings/800/1000",
    title: "Active Flex Leggings",
    description: "Stretch leggings designed for movement, comfort, and all-day wear.",
    category: "women",
    brand: "adidas",
    price: 2899,
    salePrice: 2399,
    totalStock: 17,
    averageReview: 4.4,
  }
];

async function seedProducts() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);
  await mongoose.disconnect();
}

seedProducts()
  .then(() => {
    console.log("Product seed completed");
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error.message || error);
    try {
      await mongoose.disconnect();
    } catch {}
    process.exit(1);
  });
