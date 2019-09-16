const tasks = require('require-dir')('./scripts/gulp');
const loadTasks = require('./scripts/gulp/utils/loadTasks');

// LOAD TASKS
loadTasks(tasks);
