const express = require("express");
const router = express.Router();
const { pool } = require("../config/database");

// Get all pests
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM pests WHERE status = "active" ORDER BY common_name'
    );
    res.json({ success: true, data: rows, count: rows.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get pest by ID with management strategies
router.get("/:id", async (req, res) => {
  try {
    const [pestRows] = await pool.execute(
      'SELECT * FROM pests WHERE pest_id = ? AND status = "active"',
      [req.params.id]
    );

    if (pestRows.length === 0) {
      return res.status(404).json({ success: false, error: "Pest not found" });
    }

    const [managementRows] = await pool.execute(
      "SELECT * FROM pest_management WHERE pest_id = ? ORDER BY effectiveness_rating DESC",
      [req.params.id]
    );

    res.json({
      success: true,
      data: {
        pest: pestRows[0],
        management_strategies: managementRows,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
