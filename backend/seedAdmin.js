import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10); // default password
      await Admin.create({
        username: "admin",
        password: hashedPassword,
      });
      console.log("✅ Default admin created: admin / admin123");
    } else {
      console.log("ℹ️ Admin user already exists");
    }
  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
  }
};

export default seedAdmin;
