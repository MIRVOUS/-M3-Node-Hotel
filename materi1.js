const express = require('express')
const app = express()
const port = 3000

app.get('/pertama', (req, res) => res.send('Omae wa Mou Shindeiru!'))

app.get('/user', (req, res) => {
	let user_name = 'M3'
	res.send('Ini adalah halaman user, dengan nama: ' + user_name)
})

app.get('/angka', (req, res) => {
	let nomor = '0987654321'
	res.send('Ini adalah halaman angka, dengan nomor: ' + nomor)
})

app.listen(port, () => console.log(`listening on port ${port}!`))