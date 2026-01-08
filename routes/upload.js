const express = require('express');
const router = express.Router();

const multer = require('multer');
const XLSX = require('xlsx');
const db = require('../db');

const upload = multer({ dest: 'uploads/' });

/* ==========================================
   UPLOAD EXAM RESULTS (EXCEL)
   POST /upload/results
========================================== */
router.post('/results', upload.single('file'), async (req, res) => {
  const { year, term, exam_type, class_id } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const [examResult] = await db.query(
      `INSERT INTO exams (year, term, exam_type, class_id)
       VALUES (?,?,?,?)`,
      [year, term, exam_type, class_id]
    );

    const examId = examResult.insertId;

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    for (const row of rows) {
      const [students] = await db.query(
        `SELECT id FROM students WHERE adm_no = ?`,
        [row.ADM_NO]
      );

      if (!students.length) continue;

      const studentId = students[0].id;

      for (const col of Object.keys(row)) {
        if (col === 'ADM_NO') continue;

        const [subjects] = await db.query(
          `SELECT id FROM subjects WHERE name = ?`,
          [col]
        );

        if (!subjects.length) continue;

        await db.query(
          `INSERT INTO exam_marks (exam_id, student_id, subject_id, marks)
           VALUES (?,?,?,?)`,
          [examId, studentId, subjects[0].id, row[col]]
        );
      }
    }

    res.json({ message: 'Results uploaded successfully' });

  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;