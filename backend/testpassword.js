const bcrypt = require("bcryptjs");

// Simulate password hashing and saving
const plainPassword = "123456789";
const hashedPassword = bcrypt.hashSync(plainPassword, 10); // Sync for testing purposes

// Simulate retrieving from DB and comparing
const isPasswordCorrect = bcrypt.compareSync(plainPassword, hashedPassword);

console.log("Hashed Password:", hashedPassword);
console.log("Password Match:", isPasswordCorrect); // Should print 'true' if matching
