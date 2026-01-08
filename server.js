const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

console.log('🔥 SERVER BOOTING 🔥');

const reportRoutes = require('./routes/report');
const probeRoutes  = require('./routes/probe');
const uploadRoutes = require('./routes/upload');

app.use('/report', reportRoutes);
app.use('/probe', probeRoutes);
app.use('/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'API running' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
