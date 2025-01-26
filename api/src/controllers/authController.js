const db = require("../config/db");
const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    const validatedUser = await Auth.validateUser({ email, password })

    if (validatedUser) {
        return res.json({
            status: 0,
            cls: "error",
            msg: "Email already exists",
            payload: {}
        });
    }
    const user = await Auth.register({ name, email, password })

    if (user) {
        // Generate JWT token
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({
            status: 1,
            cls: "success",
            msg: "User registered successfully",
            payload: {
                token: token,
                user: user
            }
        });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const response = await Auth.login({ email, password })

    if (!response) {
        return res.json({
            status: 0,
            cls: "error",
            msg: "Invalid email or password",
            payload: {}
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, response.password);

    if (!isPasswordMatch) {
        return res.json({
            status: 0,
            cls: "error",
            msg: "Invalid email or password",
            payload: {}
        });
    }

    const user = {
        id: response.id,
        name: response.name,
        email: response.email,
        created_at: response.created_at,
    };

    // Generate JWT token
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({
        status: 1,
        cls: "success",
        msg: "Login successful!",
        payload: {
            token: token,
            user: user
        }
    });

};



module.exports = {
    userRegister,
    userLogin
}