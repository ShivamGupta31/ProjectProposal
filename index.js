const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.all('/api', (req, res) => {
    const headers = req.headers;
    const method = req.method;
    const body = req.body;

    res.send(`
        Welcome to our demo API, here are the details of your request:
        ***Headers***:
        ${Object.entries(headers).map(([key, value]) => `${key}: ${value}`).join('\n')}

        ***Method***:
        ${method}

        ***Body***:
        ${JSON.stringify(body, null, 2)}
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api`);
});
