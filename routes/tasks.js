const router = require('express').Router();
const taskController = require('../controllers/taskController');
const { validateTask, validateObjectId } = require('../utils/taskValidation');
const isAuthenticated = require('../utils/isAuthenticated');

router.get('/', taskController.getAllTasks);
router.get('/:id', validateObjectId, taskController.getOneTask);
router.post('/', isAuthenticated, validateTask, taskController.createTask);
router.put('/:id', isAuthenticated, validateObjectId, validateTask, taskController.updateTask);
router.delete('/:id', isAuthenticated, validateObjectId, taskController.deleteTask);
router.delete('/taskName/:name', isAuthenticated, taskController.deleteManyTasks);

module.exports = router;