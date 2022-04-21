const express = require("express");
const { connect_to_database } = require("./config/db");
const app = express();
connect_to_database();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

// routes

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
