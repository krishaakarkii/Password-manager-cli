# Password Manager CLI

A command-line-based password manager that securely stores, retrieves, and deletes passwords for various services. This CLI encrypts your passwords, ensuring security, and uses a confirmation prompt for sensitive actions like deletion to prevent accidental loss.

## Table of Contents
- [Requirements](#requirements)
- [Setup](#setup)
  - [Step 1: Clone the Repository](#step-1-clone-the-repository)
  - [Step 2: Install Dependencies](#step-2-install-dependencies)
  - [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
- [Usage](#usage)
  - [Adding a Password](#adding-a-password)
  - [Retrieving a Password](#retrieving-a-password)
  - [Deleting a Password](#deleting-a-password)
- [Environment Variables](#environment-variables)
- [Example Commands](#example-commands)
- [Developer Notes](#developer-notes)
- [Author](#author)

## Requirements
- Node.js (v12 or above)
- npm or yarn (package managers)

## Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/krishaakarkii/Password-manager-cli.git
cd Password-manager-cli

### Step 2: Install Dependencies
```bash
npm install
or, if you use yarn:
yarn install

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory.

Add a secure key (used for encrypting passwords) to the `.env` file:

```plaintext
KEY=your_secure_key_here
Note: The KEY should be complex and secure. This key will be used to encrypt and decrypt your passwords, so make sure to keep it safe!

## Usage
This password manager CLI has three primary commands:

- **Add** - Stores a new password.
- **Get** - Retrieves an encrypted password.
- **Delete** - Removes a stored password, with a confirmation prompt.

### Adding a Password
To add a password for a service:

```bash
node src/index.js add --name="<service-name>" --password="<password>"

### Retrieving a Password
To retrieve a stored password for a service:

```bash
node src/index.js get --name="<service-name>"

### Deleting a Password
To delete a password for a service:

```bash
node src/index.js delete --name="<service-name>"

### Environment Variables
The password manager CLI requires one environment variable:

- **KEY** - Used for encryption and decryption. This key should be securely stored and must match the key used when passwords were initially added.

**Example .env file:**

```plaintext
KEY=your_secure_key_here

### Example Commands
Here are some commands for testing the CLI:

```bash
# Add a password for a service
node src/index.js add --name="github" --password="ComplexPassword1@"

# Retrieve the password for the service
node src/index.js get --name="github"

# Delete the password for the service
node src/index.js delete --name="github"

## Developer Notes
- The encryption and decryption processes use the `aes-256-cbc` algorithm.
- Passwords are stored in `passwords.json` with the IV (Initialization Vector) prepended to ensure secure and unique encryption for each password.
- The `inquirer` library provides confirmation prompts to prevent accidental deletions.

## Author
Developed by Krisha Karki.

GitHub: krishaakarkii

