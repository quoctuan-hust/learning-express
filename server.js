const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// Cau hinh lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [] })
  .write();

// Cau hinh cho pug
app.set('view engine', 'pug');
app.set('views','./views');

// Cau hinh cho body-parser (nhiem vu doc duoc gia tri khi POST request)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Code
let todos = db.get('todos').value();

app.get('/', (req,res) => {
  res.render('index');
});

app.get('/todos',(req,res) => {
  res.render('todos/index',{
    todos: db.get('todos').value()
  });
});

// Trang search
app.get('/todos/search',(req,res)=>{
  var q = req.query.q;
  var dataList = todos.filter(function(todo){
    return todo.work.toLowerCase().indexOf(q) !== -1;
  })
  res.render('todos/index',{
    todos: dataList
  }) 
})

// Trang create
app.get('/todos/create',(req,res)=>{
  res.render('todos/create');
})

app.post('/todos/create',(req,res)=>{
  db.get('todos').push(req.body).write();
  res.redirect('/todos');
})
        
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
