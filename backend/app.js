const express = require("express");
const app = express();
const PORT = 5000;

app.use("/", (req, res, next) => {
    res.send("Hello from express");
});

app.listen(PORT, () => console.log("Server running on port " + PORT));