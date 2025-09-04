const express = require("express");
const router = express.Router();
const { pool } = require("../config/database");
const multer = require("multer");
const modelService = require("../services/TeachableMachineModelService");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"));
    }
  },
});

// Real detection endpoint using your Teachable Machine model
router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    console.log("🔍 Detection request received");
    console.log(
      "📁 File info:",
      req.file
        ? {
            name: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype,
          }
        : "No file"
    );

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No image provided",
      });
    }

    // Use your actual Teachable Machine model
    const detectionResult = await modelService.detectPest(req.file.buffer);

    console.log("🤖 Model detection result:", detectionResult);

    // Get pest details from database using the detected pest_id
    try {
      const [pestRows] = await pool.execute(
        "SELECT * FROM pests WHERE pest_id = ? AND status = 'active'",
        [detectionResult.detected_pest.pest_id]
      );

      let result;

      if (pestRows.length > 0) {
        // Merge detection with database info
        result = {
          ...detectionResult.detected_pest,
          ...pestRows[0], // Add database fields
          confidence: detectionResult.detected_pest.confidence, // Keep model confidence
          pest_name: detectionResult.detected_pest.pest_name, // Keep model prediction
          model_info: {
            model_used: detectionResult.model_used,
            model_type: detectionResult.model_type || "Teachable Machine",
            processing_time: detectionResult.processing_time || 0,
            all_predictions: detectionResult.all_predictions || [],
          },
        };
        console.log("✅ Found pest in database:", pestRows[0].common_name);
      } else {
        // Use detection data only if not found in database
        result = {
          ...detectionResult.detected_pest,
          model_info: {
            model_used: detectionResult.model_used,
            model_type: detectionResult.model_type || "Teachable Machine",
            processing_time: detectionResult.processing_time || 0,
          },
        };
        console.log("⚠️ Pest not found in database, using model data only");
      }

      console.log("📤 Sending response:", {
        pest_name: result.pest_name,
        confidence: result.confidence + "%",
        model_used: result.model_info.model_used,
      });

      res.json({ success: true, detection: result });
    } catch (dbError) {
      console.error("❌ Database error:", dbError);

      // Return model result even if database fails
      const result = {
        ...detectionResult.detected_pest,
        description:
          "Pest detected by AI model. Database temporarily unavailable for additional details.",
        model_info: {
          model_used: detectionResult.model_used,
          model_type: detectionResult.model_type || "Teachable Machine",
          processing_time: detectionResult.processing_time || 0,
        },
      };

      res.json({ success: true, detection: result });
    }
  } catch (error) {
    console.error("❌ Detection error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Analysis failed",
    });
  }
});

// Record detection session
router.post("/session", async (req, res) => {
  try {
    const { detected_pest_id, confidence_score, detection_method } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO detection_sessions 
       (detected_pest_id, confidence_score, detection_method, session_timestamp) 
       VALUES (?, ?, ?, NOW())`,
      [detected_pest_id, confidence_score, detection_method || "tensorflow"]
    );

    res.json({ success: true, session_id: result.insertId });
  } catch (error) {
    console.error("❌ Session recording error:", error);
    res.json({
      success: true,
      session_id: null,
      warning: "Session recording failed",
    });
  }
});

// Get model status
router.get("/status", async (req, res) => {
  try {
    const modelInfo = modelService.getModelInfo
      ? modelService.getModelInfo()
      : {
          loaded: false,
          type: "Model service not available",
        };

    res.json({
      success: true,
      model: modelInfo,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
