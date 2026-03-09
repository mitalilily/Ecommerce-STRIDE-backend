require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminUserName = process.env.ADMIN_USERNAME || "admin";

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env");
  }

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required in .env");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const existingUser = await User.findOne({ email: adminEmail });
  const password = await bcrypt.hash(adminPassword, 12);

  if (existingUser) {
    existingUser.userName = adminUserName;
    existingUser.password = password;
    existingUser.role = "admin";
    await existingUser.save();
    console.log(`Updated existing admin user: ${adminEmail}`);
  } else {
    await User.create({
      userName: adminUserName,
      email: adminEmail,
      password,
      role: "admin",
    });
    console.log(`Created admin user: ${adminEmail}`);
  }

  await mongoose.disconnect();
}

seedAdmin()
  .then(() => {
    console.log("Admin seed completed");
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error.message || error);
    try {
      await mongoose.disconnect();
    } catch {}
    process.exit(1);
  });
