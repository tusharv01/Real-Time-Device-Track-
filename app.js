const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set view engine to ejs
app.set("view engine", "ejs");

// Handle socket connections
io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("recieve-location", {id: socket.id, ...data})
    });
    
    socket.on("user-disconnected", function(){
        io.emit("user-disconnected", socket.id)
    })
});

// Route to render index.ejs
app.get("/", function(req, res){
    res.render("index");
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
