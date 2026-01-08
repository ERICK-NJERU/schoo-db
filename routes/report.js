const express = require('express');
const router = express.Router();
const db = require('../db');

/*
  CLASS REPORT
  GET /report/class/:classId/:year/:term
  Used for bulk printing (one student per page)
*/
router.get('/class/:classId/:year/:term', async (req, res) => {
  try {
    const { classId, year, term } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM vw_report_card_phase2
      WHERE class_id = ?
        AND year = ?
        AND term = ?
      `,
      [classId, year, term]
    );

    res.json(rows);

  } catch (err) {
    console.error('CLASS REPORT ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

/*
  STUDENT REPORT (DETAILED – WITH SUBJECT NAMES)
  GET /report/student/:adm/:year/:term
  (Intentionally left on its own view)
*/
router.get('/student/:adm/:year/:term', async (req, res) => {
  try {
    const { adm, year, term } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM vw_report_card_student
      WHERE adm_no = ?
        AND year = ?
        AND term = ?
      ORDER BY subject_id
      `,
      [adm, year, term]
    );

    res.json(rows);

  } catch (err) {
    console.error('STUDENT DETAIL REPORT ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

/*
  STUDENT REPORT (LEGACY / SIMPLE)
  GET /report/:adm/:year/:term
*/
router.get('/:adm/:year/:term', async (req, res) => {
  try {
    const { adm, year, term } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM vw_report_card_phase2
      WHERE adm_no = ?
        AND year = ?
        AND term = ?
      `,
      [adm, year, term]
    );

    res.json(rows);

  } catch (err) {
    console.error('STUDENT REPORT ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
