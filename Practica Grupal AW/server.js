const express = require('express')
const app = express()
const port = 5050
const host = '127.0.0.1'
const path = require('path')

app.use('/src', express.static('src'));
app.use('/media', express.static('media'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'))
})

app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`)
})