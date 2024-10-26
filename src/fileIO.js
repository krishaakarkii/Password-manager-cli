require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs'); // File system for reading/writing files
const crypto = require('crypto'); // Crypto module for encryption/decryption
const inquirer = require('inquirer'); // Inquirer for confirmation prompt

const filePath = './passwords.json'; // Path to store passwords file
const algorithm = 'aes-256-cbc'; // Encryption algorithm

// Generate encryption key from environment variable
const key = crypto.scryptSync(process.env.KEY, 'salt', 32);

// Encrypt function to secure password
const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // Generate IV for encryption
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`; // Combine IV and encrypted text
};

// Decrypt function to retrieve password
const decrypt = (encryptedText) => {
  const [ivText, encrypted] = encryptedText.split(':'); // Split IV and encrypted text
  const iv = Buffer.from(ivText, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Load passwords from JSON file
const loadPasswords = () => {
  try {
    console.log("Attempting to load passwords...");
    const dataBuffer = fs.readFileSync(filePath);
    console.log("Passwords loaded successfully.");
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    console.log("No existing passwords file found, starting fresh.");
    return {};
  }
};

// Save passwords to JSON file
const savePasswords = (passwords) => {
  fs.writeFileSync(filePath, JSON.stringify(passwords));
  console.log("Passwords saved successfully.");
};

// Check password complexity before saving
const validatePasswordComplexity = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
    return true;
  } else {
    console.log("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.");
    return false;
  }
};

// Add a new password
const addPassword = (name, password) => {
  console.log(`Adding password for ${name}`);
  if (!validatePasswordComplexity(password)) return;

  const passwords = loadPasswords();
  if (passwords[name]) {
    console.log(`Password for ${name} already exists.`);
  } else {
    passwords[name] = encrypt(password); // Encrypt before saving
    savePasswords(passwords);
    console.log(`Password for ${name} added successfully.`);
  }
};

// Retrieve and decrypt a password
const getPassword = (name) => {
  const passwords = loadPasswords();
  if (passwords[name]) {
    const decryptedPassword = decrypt(passwords[name]); // Decrypt to retrieve
    console.log(`Password for ${name}: ${decryptedPassword}`);
  } else {
    console.log(`No password found for ${name}.`);
  }
};

// Delete a password with user confirmation
const deletePassword = async (name) => {
  const passwords = loadPasswords();
  if (!passwords[name]) {
    console.log(`No password found for ${name}.`);
    return;
  }

  const { confirm } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to delete the password for ${name}?`,
    default: false,
  });

  if (confirm) {
    delete passwords[name];
    savePasswords(passwords);
    console.log(`Password for ${name} deleted successfully.`);
  } else {
    console.log(`Deletion of ${name} canceled.`);
  }
};

module.exports = { addPassword, getPassword, deletePassword };
