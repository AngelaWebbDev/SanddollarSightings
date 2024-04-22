const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    //create
    app.post('/api/newuser',UserController.addUser);
}