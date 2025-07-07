const Task = require('../models/Task');

async function getTasks(req, res) {
  console.log('GET /tasks called with:', req.body);
  const tasks =await Task.find();
  res.json(tasks);  
}

async function addTask(req, res) {
 console.log('POST /tasks called with:', req.body);
 const title=req.body.title;
 const task=new Task({title});
 await task.save();
 res.json(task);
}

async function toggleTask(req, res) {
  console.log('PATCH /tasks called with:', req.body);
  const taskId=req.params.id;
  const task=await Task.findById(taskId);
  if(!task) return res.status(404).send('Task not found');
  task.done=!task.done;
  await task.save();
  res.json(task);
}

async function deleteTask(req, res) {
  console.log('DELETE /tasks called with:', req.body);
  const taskId=req.params.id;
  const task=await Task.findByIdAndDelete(taskId);
  if(!task) return res.status(404).send('Task not found');
  res.status(204).send();
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
