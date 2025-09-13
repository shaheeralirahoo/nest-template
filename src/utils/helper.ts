const bcrypt = require('bcrypt');


export async function hashPassword(password) {
    try {
        const saltRounds = 10; // Salt rounds to use (higher = more secure, but slower)
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
}

// Function to compare password with the hashed password
export async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match; // Returns true if passwords match, otherwise false
    } catch (error) {
        throw new Error('Error comparing password: ' + error.message);
    }
}

