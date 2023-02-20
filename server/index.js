// Step 1: Setting up server
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const PORT = process.env.PORT || 8080;
const app = express();
const socketio = require("socket.io");
module.exports = app;

// Step 2: Add function that will create the app
const createApp = () => {
    app.use(morgan("dev")); // logging middleware

    // body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(compression()); // compression middleware

    app.use(express.static(path.join(__dirname, "..", "public"))); // static file-serving middeware

    // any remaining requests with an extension (.js, .css, etc.) send 404
    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error("Not found");
            err.status = 404;
            next(err);
        } else {
            next();
        }
    });

    // Step 3: Tell the server to get the index.html
    // sends index.html
    app.use("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "public/index.html"));
    });

    // error handling endware
    app.use((err, req, res, next) => {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || "Internal server error.");
    });
};

// Step 4A: Set up server to listen to the port
const startListening = () => {
    // start listening and create 'server' object
    const server = app.listen(PORT, () =>
        console.log(`Mixing it up on port ${PORT}`)
    );

    // Sets up sockets on server side
    const io = socketio(server);
    require("./socket")(io);
};

// Step 4B: Set up server to boot the app
async function bootApp() {
    await createApp();
    await startListening();
}

// Evaluates to true when this file is run directly from the command line
// Evaluates to false when this module is required by another module
if (require.main === module) {
    bootApp();
} else {
    createApp();
}

