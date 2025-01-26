const db = require("../config/db");

const LogService = {
    logAction: async (action, details) => {
        await db.query("INSERT INTO logs (action, details) VALUES (?, ?)", [action, details]);
    },
};

module.exports = LogService;
