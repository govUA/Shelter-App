require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

app.use(cors());
app.use(express.json());

app.get('/shelters', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT s.id, s.name, s.address, s.rating, s.photo_url AS "photoUrl", s.description,
                   COALESCE(json_agg(f.*) FILTER (WHERE f.id IS NOT NULL), '[]') AS feedback
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

app.post('/shelters/:shelterId/feedback', async (req, res) => {
    const shelterId = parseInt(req.params.shelterId);
    const { user, rating, comment, imageUrl } = req.body;

    if (!user || !rating || !comment) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const insertFeedbackQuery = `
            INSERT INTO feedback (shelter_id, user_name, rating, comment, image_url)
            VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
        `;
        const insertFeedbackValues = [shelterId, user, rating, comment, imageUrl || null];

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
