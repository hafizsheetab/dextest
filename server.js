const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000;

app.use(express.json({extende:false}))
app.use('/api/aeternity',require('./routes/aeternity'))
app.use('/api/ethereum',require('./routes/ethereum'))
  
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));1