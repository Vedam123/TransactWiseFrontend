require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();

// Retrieve the environment variables from the .env file
const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, process.env.SSL_KEY_FILE)),
    cert: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CRT_FILE))
};

// Optional: Check for the CA certificate if needed (not required unless specified)
if (process.env.SSL_CA_FILE) {
    sslOptions.ca = fs.readFileSync(path.resolve(__dirname, process.env.SSL_CA_FILE));
}

// Serve static files from the React app's production build (build folder)
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for React Router (handles client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Setup the HTTPS server
const port = process.env.PORT || 443;  // Default to 443 if not specified in .env
https.createServer(sslOptions, app).listen(port, '0.0.0.0', () => {  // Bind to '0.0.0.0' to allow access from all network interfaces
    console.log(`Server running on ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`);
});

