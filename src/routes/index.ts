import { Router } from "express";
import multer from "multer";
import ContactUsController from "../controllers/ContactUsController";
import CustomerController from "../controllers/CustomerController";
import CompanyController from "../controllers/CompanyController";
import SessionController from "../controllers/SessionController";
import isAuthenticated from "../middleware/isAuthenticated";
import WelcomeController from "../controllers/WelcomeController";
import multerConfig from "../configurations/multerConfig";
import AvatarController from "../controllers/AvatarController";
import DepartmentController from "../controllers/DepartmentController";
import QuestionController from "../controllers/QuestionController";
import AnswerController from "../controllers/AnswerController";
import TopicController from "../controllers/TopicController";
import QRCodeController from "../controllers/QRCodeController";

const uploadAvatar = multer(multerConfig);

const router = Router();

router.get('/welcome', WelcomeController.welcome);
router.get('/customers', isAuthenticated, CustomerController.list);
router.get('/details', isAuthenticated, CustomerController.showDetailsCustomer);
router.get('/customer', isAuthenticated, CustomerController.show);
router.get('/companies', isAuthenticated, CompanyController.list);
router.get('/company', isAuthenticated, CompanyController.show);
router.get('/avatar', isAuthenticated, AvatarController.returnAvatar);
router.get('/has-company', isAuthenticated, CustomerController.checkHasCompany);
router.get('/department', isAuthenticated, DepartmentController.list);
router.get('/departments', isAuthenticated, DepartmentController.listAll);
router.get('/departments/company/:id', isAuthenticated, DepartmentController.listDepartmentsByCompany);
router.get('/question', isAuthenticated, QuestionController.list);
router.get('/questions', isAuthenticated, QuestionController.listAll);
router.get('/answer', isAuthenticated, AnswerController.list);
router.get('/answers', isAuthenticated, AnswerController.listAll);
router.get('/topic', isAuthenticated, TopicController.list);
router.get('/topics', isAuthenticated, TopicController.listAll);

router.post('/customer', CustomerController.create);
router.post('/session', SessionController.create);
router.post('/forgot-password', CustomerController.send);
router.post('/company', isAuthenticated, CompanyController.create);
router.post('/contact-us', ContactUsController.sendNewMessage);
router.post('/department', isAuthenticated, DepartmentController.add);
router.post('/question', isAuthenticated, QuestionController.add);
router.post('/answer', isAuthenticated, AnswerController.add);
router.post('/topic', isAuthenticated, TopicController.add);
router.post('/qrcode', isAuthenticated, QRCodeController.generate);

router.delete('/customer', isAuthenticated, CustomerController.remove);
router.delete('/company', isAuthenticated, CompanyController.remove);
router.delete('/avatar', isAuthenticated, CustomerController.removeAvatarCustomer);
router.delete('/department', isAuthenticated, DepartmentController.delete);
router.delete('/question', isAuthenticated, QuestionController.remove);
router.delete('/answer', isAuthenticated, AnswerController.remove);
router.delete('/topic', isAuthenticated, TopicController.delete);

router.put('/company', isAuthenticated, CompanyController.update);
router.put('/customer', isAuthenticated, CustomerController.update);
router.put('/department', isAuthenticated, DepartmentController.update);
router.put('/question', isAuthenticated, QuestionController.edit);
router.put('/answer', isAuthenticated, AnswerController.edit);
router.put('/topic', isAuthenticated, TopicController.update);

router.patch('/avatar', isAuthenticated, uploadAvatar.single('file'), AvatarController.update);
router.patch('/customer/email', isAuthenticated, CustomerController.updateEmailCustomer);
router.patch('/customer/password', isAuthenticated, CustomerController.updatePasswordCustomer);
router.patch('/customer/reset-password', CustomerController.reset);
router.patch('/info', isAuthenticated, CustomerController.acceptInfo);
router.patch('/active-customer', CustomerController.ative);
router.patch('/topic', TopicController.changeStatus);
router.patch('/department', DepartmentController.changeStatus);
router.patch('/question', QuestionController.changeStatus);

export default router;