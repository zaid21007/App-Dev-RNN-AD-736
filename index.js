const express = require('express');
const app = express();

require('./init/config')();
require('./init/databaseConnect')();
require('./init/getRoutes')(app);

app.get('/', (req, res) => {
  res.send('API is running....');
});
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Listening at Port: ${PORT}`));
