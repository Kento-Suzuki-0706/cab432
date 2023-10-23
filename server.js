require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

const MASTODON_INSTANCE_URL = process.env.MASTODON_INSTANCE_URL;
const MASTODON_ACCESS_TOKEN = process.env.MASTODON_ACCESS_TOKEN;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(MASTODON_INSTANCE_URL, {
            headers: {
                'Authorization': `Bearer ${MASTODON_ACCESS_TOKEN}`
            }
        });
        
        const posts = response.data;
        res.render('index', { posts });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching Mastodon posts.');
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
