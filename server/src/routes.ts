import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import TeacherController from './controllers/TeacherController';

const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const teacherController = new TeacherController();


routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

routes.post('/signup', usersController.create);
routes.post('/login', usersController.login);
routes.get('/logout', usersController.logout);

routes.get('/user', usersController.index);

routes.post('/forgot_password', usersController.forgotPassword);
routes.post('/reset_password', usersController.resetPassword);

routes.get('/profile', teacherController.index);
routes.post('/update/', teacherController.update);
routes.post('/prof/favorites', teacherController.setFavorites);
routes.post('/prof/delfavorites', teacherController.delFavorites);
routes.post('/prof/loadfavorites', teacherController.loadFavorites);

export default routes;