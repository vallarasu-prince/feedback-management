const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/feedbacks", authenticateToken, feedbackController.getAllFeedbacks);
router.get("/feedback/:id", authenticateToken, feedbackController.getFeedbackById);
router.post("/feedback", authenticateToken, feedbackController.createFeedback);
router.put("/feedback/:id", authenticateToken, feedbackController.updateFeedback);
router.delete("/feedback/:id", authenticateToken, feedbackController.deleteFeedback);
router.post("/feedback/vote/:id", authenticateToken, feedbackController.voteFeedback);

module.exports = router;
