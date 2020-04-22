const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Cau hinh cho pug
app.set('view engine', 'pug');
app.set('views','./views');

// Cau hinh cho body-parser (nhiem vu doc duoc gia tri khi POST request)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Code
var todos =[
      {id: 1, work: 'Nau com'},
      {id: 2, work: 'Rua bat'},
      {id: 3, work: 'Hoc code'},
    ]


app.get('/', (req,res) => {
  res.render('index');
});

app.get('/todos',(req,res) => {
  res.render('todos/index',{
    todos: todos
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
  todos.push(req.body);
  res.redirect('back');
})
        
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
