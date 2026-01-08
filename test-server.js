const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 LOAD THE REAL REPORT ROUTES
require("./routes/report.routes")(app);

// OPTIONAL sanity check
app.get("/test", (req, res) => {
  res.send("TEST SERVER OK");
});

app.listen(4000, () => {
  console.log("🧪 Test server running on http://localhost:4000");
});
