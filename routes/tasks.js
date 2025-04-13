const router = require('express').Router();
const taskController = require('../controllers/taskController');
const { validateTask, validateObjectId } = require('../utils/taskValidation');
//const { isAuthenticated } = require('../utils/authenticate');

router.get('/', taskController.getAllTasks);
router.get('/:id', validateObjectId, taskController.getOneTask);
router.post('/', validateTask, taskController.createTask);
router.put('/:id', validateObjectId, validateTask, taskController.updateTask);
router.delete('/:id', validateObjectId, taskController.deleteTask);
router.delete('/taskName/:name', taskController.deleteManyTasks);

module.exports = router;