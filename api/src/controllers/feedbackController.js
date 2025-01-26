const Feedback = require("../models/feedback");
const LogService = require("../services/logService");

const getAllFeedbacks = async (req, res) => {
    const feedbacks = await Feedback.getAll();
    res.json({
        status: 1,
        cls: "success",
        msg: "Success",
        payload: feedbacks
    });
    await LogService.logAction("GET_ALL_FEEDBACKS", "Fetched all feedbacks");

};

const getFeedbackById = async (req, res) => {
    const { id } = req.params;
    const feedback = await Feedback.getById(id);
    if (!feedback) return res.json({
        status: 0,
        cls: "error",
        msg: "Feedback not found!",
        payload: {}
    });

    await LogService.logAction("GET_FEEDBACK", `Fetched feedback with ID: ${id}`);
    res.json({
        status: 1,
        cls: "success",
        msg: "Success",
        payload: feedback
    });
};

const createFeedback = async (req, res) => {
    const username = req.user.name;
    const feedbackId = await Feedback.create({ ...req.body, name: username });
    res.json({
        status: 1,
        cls: "success",
        msg: "Your feedback added successfully!",
        payload: {}
    });
    await LogService.logAction("CREATE_FEEDBACK", `Created feedback with ID: ${feedbackId}`);
};

const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const username = req.user.name;
    await Feedback.update(id, { ...req.body, name: username });
    await LogService.logAction("UPDATE_FEEDBACK", `Updated feedback with ID: ${id}`);
    res.json({ message: "Feedback updated" });
};

const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    await Feedback.delete(id);
    await LogService.logAction("DELETE_FEEDBACK", `Deleted feedback with ID: ${id}`);
    res.json({
        status: 1,
        cls: "success",
        msg: "Your feedback deleted successfully!",
        payload: {}
    });
};
const voteFeedback = async (req, res) => {
    const { id } = req.params;
    await Feedback.updateVote(id);
    await LogService.logAction("VOTE_FEEDBACK", `Vote feedback with ID: ${id}`);
    res.json({
        status: 1,
        cls: "success",
        msg: "Your vote updated successfully!",
        payload: {}
    });
};

module.exports = {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    voteFeedback
};
