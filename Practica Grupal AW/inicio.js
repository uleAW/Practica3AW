const express = require('express')
const app = express()
const port = 5050
const host = '127.0.0.1'
const path = require('path')

app.use('/html', express.static('html'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));
//app.use('/principal', express.static('principal'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'principal.html'))
})

app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`)
})