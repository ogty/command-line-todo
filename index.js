import fs from 'fs';
import inquirer from 'inquirer';


const fileName = 'todos.json';
const characterCode = 'utf-8';

const update = (todos) => {
  fs.writeFileSync(fileName, JSON.stringify(todos), characterCode);
};

let todos = JSON.parse(fs.readFileSync(fileName, characterCode));
const command = process.argv[2];

if (command === 'add') {
  const todo = process.argv[3];
  if (todo) {
    todos.push(todo);
    update(todos);
  }
  process.exit(0);
}
if (command === 'clear') {
  todos = [];
  update(todos);
  process.exit(0);
}

if (!todos.length) {
  console.info('No Todos.');
  process.exit(0);
}

inquirer
  .prompt([
    {
      type: 'checkbox',
      name: 'reptiles',
      message: 'Are there any todos that have been completed?',
      choices: todos,
    },
  ])
  .then(answers => {
    const selectedItems = answers.reptiles;
    const remainingTodos = todos.filter(i => selectedItems.indexOf(i) == -1)
    update(remainingTodos);
  });
