import { Router } from "express";
import multer from "multer";
import ContactUsController from "../controllers/ContactUsController";
import CustomerController from "../controllers/CustomerController";
import CompanyController from "../controllers/CompanyController";
import SessionController from "../controllers/SessionController";
import isAuthenticated from "../middleware/isAuthenticated";
import WelcomeController from "../controllers/WelcomeController";
import avatarConfig from "../configurations/avatarConfig";
import configLogoClient from "../configurations/configLogoClient";
import AvatarController from "../controllers/AvatarController";
import DepartmentController from "../controllers/DepartmentController";
import QuestionController from "../controllers/QuestionController";
import AnswerController from "../controllers/AnswerController";
import TopicController from "../controllers/TopicController";
import QRCodeController from "../controllers/QRCodeController";
import LogoClientController from "../controllers/LogoClientController";
import ParamsQuestionController from "../controllers/ParamsQuestionController";
import ParamsProductController from "../controllers/ParamsProductController";
import ProductController from "../controllers/ProductController";
import NPSController from "src/controllers/NPSController";

const uploadAvatar = multer(avatarConfig);
const uploadLogoClient = multer(configLogoClient);

const router = Router();

router.get('/welcome', WelcomeController.welcome);
router.get('/customers', isAuthenticated, CustomerController.list);
router.get('/details', isAuthenticated, CustomerController.showDetailsCustomer);
router.get('/customer', isAuthenticated, CustomerController.show);
router.get('/companies', isAuthenticated, CompanyController.list);
router.get('/company/:id', isAuthenticated, CompanyController.show);
router.get('/company-departments', isAuthenticated, CompanyController.listDepartmentsByCompany);
router.get('/company-topics', isAuthenticated, CompanyController.listTopicsByCompany);
router.get('/company-questions', isAuthenticated, CompanyController.listQuestionByCompany);
router.get('/avatar', isAuthenticated, AvatarController.returnAvatar);
router.get('/logo-company',isAuthenticated, LogoClientController.returnLogo);
router.get('/has-company', isAuthenticated, CustomerController.checkHasCompany);
router.get('/department', isAuthenticated, DepartmentController.list);
router.get('/departments', isAuthenticated, DepartmentController.listAll);
router.get('/question', isAuthenticated, QuestionController.list);
router.get('/questions', isAuthenticated, QuestionController.listAll);
router.get('/answer', isAuthenticated, AnswerController.list);
router.get('/answers', isAuthenticated, AnswerController.listAll);
router.get('/topic', isAuthenticated, TopicController.list);
router.get('/topics', isAuthenticated, TopicController.listAll);
router.get('/anchor-question/:product_id', isAuthenticated, ProductController.listAnchorQuestion);
router.get('/params/question/:question_id', isAuthenticated, ParamsQuestionController.listParams);
router.get('/params/product/:product_id', isAuthenticated, ParamsProductController.listParams);
router.get('/product/company', isAuthenticated, ProductController.listProducts);
router.get('/params/questions', isAuthenticated, ParamsQuestionController.listParamsOfQuestion);

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
router.post('/params/question', isAuthenticated, ParamsQuestionController.createParamsQuestion);
router.post('/params/product', isAuthenticated, ParamsProductController.addParams);
router.post('/add/product', isAuthenticated, ProductController.addNewProduct);
router.post('/link/company/product', isAuthenticated, CompanyController.linkCompanyToProduct);

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
router.patch('/logo-company', isAuthenticated, uploadLogoClient.single('file'), LogoClientController.update);
router.patch('/customer/email', isAuthenticated, CustomerController.updateEmailCustomer);
router.patch('/customer/password', isAuthenticated, CustomerController.updatePasswordCustomer);
router.patch('/customer/reset-password', CustomerController.reset);
router.patch('/info', isAuthenticated, CustomerController.acceptInfo);
router.patch('/active-customer', CustomerController.ative);
router.patch('/params/background-color', isAuthenticated, ParamsProductController.updateBackgroundColor);
router.patch('/params/font-color', isAuthenticated, ParamsProductController.updateFontColor);
router.patch('/topic', isAuthenticated, TopicController.changeStatus);
router.patch('/department', isAuthenticated, DepartmentController.changeStatus);
router.patch('/question', isAuthenticated ,QuestionController.changeStatus);
router.patch('/anchor-question', isAuthenticated, ProductController.changeAnchorQuestion);
router.patch('/params/passing/tree', isAuthenticated, ParamsProductController.changePassingTree);
router.patch('/resend-email', CustomerController.resendEmail);
router.patch('/params/boolean/question', isAuthenticated, ParamsQuestionController.updateBooleanParams);

// nps
router.get('/nps/header/:cnpj', NPSController.listAnchorQuestionAndLogoClient);
router.get('/nps/company/:cnpj/questions');

export default router;