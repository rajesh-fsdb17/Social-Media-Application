const express = require('express');
const app = express();
const cors = require('cors');
const rootRouter = require('./routes');

app.use(express.json());
app.use(cors());
app.use('/api/v1', rootRouter);  // Note the leading '/'

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
