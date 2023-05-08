const connectToMongo =require('./db');
const express = require('express')
connectToMongo();
const app = express()
const port = 4000
var cors = require('cors')
// app.get('/', (req, res) => {
//   res.send('Hello MUFASA!')
// })
app.use(cors())

app.use(express.json())
app.use('/api/auth/',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.use('/api/user/',require('./routes/user'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));