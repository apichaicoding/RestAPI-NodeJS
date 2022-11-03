const express = require('express')
const app = express()
const users = require('./user.json')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// read
app.get('/getUsers', (req, res) => {
    res.json(users)
    res.status(201).json(req.body)
})
app.get('/getUser/:id', (req, res) => {
    res.json(users.find(user => user.id === req.params.id))
    res.status(201).json(req.body)
})

// add
app.post('/addUser', (req, res) => {
    users.push(req.body)
    res.status(201).json(req.body)
})

//update
app.put('/updateUser/:id', (req, res) => {
    const updateIndex = users.findIndex(user => user.id === req.params.id)
    res.json(Object.assign(users[updateIndex], req.body))
    res.status(201).json(req.body)
})

//delete
app.delete('/deleteUser/:id', (req, res) => {
    const deletedIndex = users.findIndex(user => user.id === req.params.id)
    users.splice(deletedIndex, 1)
    res.status(204).send()
})

const PORT = process.env.PORT || 5000;

//server
app.listen(PORT, console.log(
    `Server started on port ${PORT}`));