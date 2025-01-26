const db = require("../config/db");
const bcrypt = require("bcryptjs");

const Auth = {
    login: async (data) => {
        const { email, password } = data;

        const [result] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return result[0];
    },
    validateUser: async (data) => {
        const { email, password } = data;
        const [result] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return result[0];
    },
    register: async (data) => {
        const { name, email, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        const newUser = {
            id: result.insertId,
            name,
            email,
            created_at: new Date().toISOString(),
        };
        return newUser
    },
};

module.exports = Auth;
