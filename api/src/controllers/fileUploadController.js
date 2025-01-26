const cloudinary = require('../config/cloudinaryConfig');
const LogService = require("../services/logService");

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }


        cloudinary.uploader.upload_stream(
            { resource_type: 'auto', public_id: `uploads/${Date.now()}` },
            (error, result) => {
                if (error) {
                    return res.status(500).send({ message: 'Error uploading file', error });
                }
                LogService.logAction("FILE_UPLOAD", `File uploaded: ${result.secure_url}`);
                res.json({
                    status: 1,
                    cls: "success",
                    msg: 'File uploaded successfully!',
                    payload: {
                        publicUrl: result.secure_url,
                    }
                });
            }
        ).end(req.file.buffer);
    } catch (err) {
        console.error(err);
        res.json({
            status: 0,
            cls: "error",
            msg: err,
            payload: {}
        });
    }
};

module.exports = { uploadFile };
