const router = require('express').Router();
const taskController = require('../controllers/taskController');
//const validation = require('../middleware/validate');
//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getOneTask);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;