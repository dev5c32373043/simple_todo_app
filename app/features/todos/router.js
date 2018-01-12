const todoRouter = require('express').Router();
const Todo       = require('../../models/Todo');
const sillyAuth  = require('../silly_auth');

todoRouter.use(sillyAuth);

todoRouter.get('/', (req, res)=>{
  Todo.find({owner: req.ownerId}).sort({ createdAt: -1 }).exec((error, todos)=>{
    if(error) return res.send(error);
    res.json(todos);
  })
})

todoRouter.post('/', (req, res)=>{
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    owner: req.ownerId
  });
  todo.save((error, todo)=>{
    if(error) return res.json(error)
    res.json({todo: todo, status: 'ok'})
  })
})

todoRouter.patch('/:id', (req, res)=>{
  const todoId = req.params.id, data = req.body;
  Todo.findById(todoId, (error, todo)=>{
    if(error) return res.json(error)
    todo.title = data.title || todo.title;
    todo.description = data.description || todo.description;
    todo.save((error, todo)=>{
      if(error) return res.send(error)
      res.json({todo: todo })
    })
  })
})

todoRouter.delete('/:id', (req, res)=>{
  const todoId = req.params.id;
  Todo.findById(todoId).remove((error)=>{
    if(error) return res.send(error)
    res.end()
  })
})

module.exports = todoRouter;
