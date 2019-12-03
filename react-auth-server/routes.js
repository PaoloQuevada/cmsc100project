
const controller = require('./controller');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send('This is the back end API~')
  })

  app.post('/signup', controller.signup)
  app.post('/login', controller.login)
  app.post('/getInfo', controller.getInfo)
  app.post('/editProfile', controller.editProfile)
  app.post('/addPost', controller.addPost)
  app.post('/checkIfLoggedIn', controller.checkIfLoggedIn)

}