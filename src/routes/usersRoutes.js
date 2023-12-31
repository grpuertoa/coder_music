const express = require ('express');
const usersRouter = express.Router();
const uploadUser = require('../middlewares/multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userSessionMiddleware = require('../middlewares/userSessionMiddleware');
const guestMiddlewareAdmin = require('../middlewares/guestMiddlewareAdmin');
const userController = require ('../controllers/userController');
const rulesUsers = require('../middlewares/validatorUsers');
const rulesUsersEdit = require('../middlewares/validatorUsersEdit')


//métodos del login
usersRouter.get('/login', authMiddleware, userController.login);
usersRouter.get('/logout', guestMiddleware, userController.logout);
usersRouter.post('/login',userController.processLogin);
//Creación usuario
usersRouter.get('/createProfile',userController.createUser);
usersRouter.post('/createProfile',uploadUser.single('user_image'),rulesUsers,userController.storeUser);
//Modificación usuario
usersRouter.get('/editProfile/:id',userController.editUser);
usersRouter.put('/editProfile/:id',uploadUser.single('user_image_edit'),rulesUsersEdit,userController.updateUser);
//Entrar a la página de perfil del usuario
usersRouter.get('/profile/:id', guestMiddleware, userController.userProfile);
//Eliminación usuario
usersRouter.get('/deleteUser/:id', guestMiddlewareAdmin, userController.destroyUser);
usersRouter.delete('/deleteUser/:id',userController.destroyUser);
//Entrar al listado de administrar usuarios
usersRouter.get('/users', guestMiddlewareAdmin, userController.userList);



usersRouter.get('/contact',userController.contact);

//export
module.exports = usersRouter;
