const db = require("../config/db");

const Feedback = {
    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM feedbacks");
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM feedbacks WHERE id = ?", [id]);
        return rows[0];
    },
    create: async (data) => {
        const { title, platform, module, description, attachments, tags, status = "new", name } = data;
        const tagsString = JSON.stringify(tags);

        const [result] = await db.query(
            "INSERT INTO feedbacks (title, platform, module, description, attachments, tags, status, user, votes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [title, platform, module, description, attachments, tagsString, status, name, 0]
        );
        return result.insertId; // Return the ID of the newly created record
    },
    update: async (id, data) => {
        const { title, platform, module, description, attachments, tags, status = "new", name } = data;
        const tagsString = JSON.stringify(tags);
        await db.query(
            "UPDATE feedbacks SET title = ?, platform = ?, module = ?, description = ?, attachments = ?, tags = ?, status = ?, user = ? WHERE id = ?",
            [title, platform, module, description, attachments, tagsString, status, name, id]
        );
    },
    updateVote: async (id) => {
        await db.query("UPDATE feedbacks SET votes = votes + 1 WHERE id = ?", [id]);
    },
    delete: async (id) => {
        await db.query("DELETE FROM feedbacks WHERE id = ?", [id]);
    },
};

module.exports = Feedback;
