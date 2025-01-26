const db = require("../config/db");

const trackingMiddleware = async (req, res, next) => {
    const { method, originalUrl, body } = req;

    // Save the response's original send method
    const originalSend = res.send;

    // Intercept the response body
    res.send = async function (data) {
        try {
            // Log the request and response to the tracking table
            await db.query(
                "INSERT INTO tracking (api_endpoint, method, request_body, response_body, status_code) VALUES (?, ?, ?, ?, ?)",
                [
                    originalUrl,
                    method,
                    JSON.stringify(body || {}),
                    data.toString(), // Response data
                    res.statusCode,  // Response status
                ]
            );
        } catch (err) {
            console.error("Error logging tracking data:", err.message);
        }

        // Call the original send method with the response data
        originalSend.call(this, data);
    };

    next();
};

module.exports = trackingMiddleware;
