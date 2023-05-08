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
import DepartmentController from "src/controllers/DepartmentController";

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

router.post('/customer', CustomerController.create);
router.post('/session', SessionController.create);
router.post('/forgot-password', CustomerController.send);
router.post('/company', isAuthenticated, CompanyController.create);
router.post('/contact-us', ContactUsController.sendNewMessage);
router.post('/department', DepartmentController.add);

router.delete('/customer', isAuthenticated, CustomerController.remove);
router.delete('/company', isAuthenticated, CompanyController.remove);
router.delete('/avatar', isAuthenticated, CustomerController.removeAvatarCustomer);

router.put('/company', isAuthenticated, CompanyController.update);
router.put('/customer', isAuthenticated, CustomerController.update);
router.put('/department', isAuthenticated, DepartmentController.update);

router.patch('/avatar', isAuthenticated, uploadAvatar.single('file'), AvatarController.update);
router.patch('/customer/email', isAuthenticated, CustomerController.updateEmailCustomer);
router.patch('/customer/password', isAuthenticated, CustomerController.updatePasswordCustomer);
router.patch('/customer/reset-password', CustomerController.reset);
router.patch('/info', isAuthenticated, CustomerController.acceptInfo);
router.patch('/active-customer', CustomerController.ative);

export default router;