require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');

        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }

        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `shelter-feedback-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(new Error('Error: Only image files are allowed!'));
    }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/shelters', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT s.id, s.name, s.address, s.rating, s.photo_url AS "photoUrl", s.description,
                   COALESCE(
                                   json_agg(
                                   json_build_object(
                                           'id', f.id,
                                           'shelter_id', f.shelter_id,
                                           'user_name', f.user_name,
                                           'rating', f.rating,
                                           'comment', f.comment,
                                           'imageUrl', f.image_url
                                   )
                                           ) FILTER (WHERE f.id IS NOT NULL), '[]'
                   ) AS feedback
            FROM shelters s
                     LEFT JOIN feedback f ON s.id = f.shelter_id
            GROUP BY s.id;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching shelters:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/shelters/:shelterId/feedback', upload.single('image'), async (req, res) => {
    const shelterId = parseInt(req.params.shelterId);
    const { user, rating, comment } = req.body;

    if (!user || !rating || !comment) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const imageUrl = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        const insertFeedbackQuery = `
            INSERT INTO feedback (shelter_id, user_name, rating, comment, image_url)
            VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
        `;
        const insertFeedbackValues = [shelterId, user, rating, comment, imageUrl];

        const feedbackResult = await pool.query(insertFeedbackQuery, insertFeedbackValues);
        const feedback = feedbackResult.rows[0];

        const feedbackRatingsResult = await pool.query(
            `SELECT rating FROM feedback WHERE shelter_id = $1`,
            [shelterId]
        );
        const ratings = feedbackRatingsResult.rows.map(row => row.rating);
        const newAverageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

        await pool.query(
            `UPDATE shelters SET rating = $1 WHERE id = $2`,
            [Number(newAverageRating.toFixed(1)), shelterId]
        );

        res.status(201).json(feedback);
    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ error: 'Error adding feedback' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
