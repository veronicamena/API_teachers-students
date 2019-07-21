let express = require('express');
let router = express.Router();

let apiStudentsRouter = require('./api/students')
let apiUsersRouter = require('./api/users')

router.use('/students', apiStudentsRouter)  //tengo un students.js dentro de la carpeta api
router.use('/users', apiUsersRouter)

module.exports = router;