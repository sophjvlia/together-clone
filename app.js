const express = require("express");
const cors = require('cors');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

// API route example
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// register
app.post("/signup", async (req, res) => {

  try {
    const response = await fetch("https://focuspoint.fireworksmedia.com/loyalty/api/register.php", {
      method: "POST",
      type: "POST",
      body: JSON.stringify(req.data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    console.log(result);

    res.json({ message: "Signup successful" });
  } catch (error) {
    console.error('Error:', error);
  }
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

req.on("close", () => {
  console.log("closed connection");
});

console.log(res.socket.destroyed);

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.setTimeout(60000);
