const express = require("express");
const MongoClient = require('mongodb').MongoClient
const app = express()

const connectionString = "mongodb+srv://Jimmy:jimmylu@freecluster-2zcsn.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('todo-list')
    const todoCollection = db.collection('todos')

    // ========================
    // Middlewares
    // ========================
    app.set('view engine', 'ejs')
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(express.static('public'))

    // ========================
    // Routes
    // ========================

    app.get("/myForm", (req, res) => res.render("pages/myForm.ejs"));

    app.get('/', (req, res) => {
      db.collection('todos').find().toArray()
        .then(todos => {
            res.render('pages/result.ejs', { todos: todos })
        })
        .catch(error => console.error(error))
    })

    app.post('/addItems', (req, res) => {
      todoCollection.insertMany(req.body)
        .then(result => {
          console.log(req.body)
        })
        .catch(error => console.error(error))
    })

    app.put('/update', (req, res) => {
      todoCollection.findOneAndUpdate(
        { value_lower: req.body.checkValue },
        {
          $set: {
            value: req.body.newValue,
            value_lower: req.body.newValue_lower
          }
        },
        {
          upsert: false
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.delete('/delete', (req, res) => {
      todoCollection.deleteOne(
        { value_lower: req.body.checkValue }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No todo to delete')
          }
          res.json('Deleted todo item')
        })
        .catch(error => console.error(error))
    })

    // ========================
    // Listen
    // ========================
    const port = 3000
    app.listen(port, function () {
      console.log(`listening on ${port}`)
    })
  })
  .catch(console.error)