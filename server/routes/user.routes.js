const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    
    //create new user
    app.post('/api/newuser',UserController.registerUser);

    //login with cookie
    app.post('/api/login', UserController.login)

    //log out, clear cookie
    app.post('/api/logout', UserController.logout)
}