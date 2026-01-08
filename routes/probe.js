const express = require('express');
const router = express.Router();

/* ===============================
   PROBE / HEALTH CHECK
================================ */
router.get('/__probe__', (req, res) => {
  res.send('PROBE OK');
});

module.exports = router;
