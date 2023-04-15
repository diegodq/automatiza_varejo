import { Router } from "express";
import multer from "multer";
import ContactUsController from "../controllers/ContactUsController";
import CustomerController from "../controllers/CustomerController";
import CompanyController from "../controllers/CompanyController";
import SessionController from "../controllers/SessionController";
import SendEmailResetPasswordController from "../controllers/SendEmailResetPasswordController";
import isAuthenticated from "../middleware/isAuthenticated";
import WelcomeController from "../controllers/WelcomeController";
import multerConfig from "../configurations/multerConfig";
import AvatarController from "../controllers/AvatarController";
import ActiveClientController from "src/controllers/ActiveClientController";

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
router.post('/active-customer', ActiveClientController.ative);
router.post('/forgot-password', SendEmailResetPasswordController.send);
router.post('/company', isAuthenticated, CompanyController.create);
router.post('/contact-us', ContactUsController.sendNewMessage);


router.delete('/customer', isAuthenticated, CustomerController.remove);
router.delete('/company', isAuthenticated, CompanyController.remove);
router.delete('/avatar', isAuthenticated, CustomerController.removeAvatarCustomer);

router.put('/company', isAuthenticated, CompanyController.update);
router.put('/customer', isAuthenticated, CustomerController.update);

router.patch('/avatar', isAuthenticated, uploadAvatar.single('file'), AvatarController.update);
router.patch('/customer/email', isAuthenticated, CustomerController.updateEmailCustomer);
router.patch('/customer/password', isAuthenticated, CustomerController.updatePasswordCustomer);
router.patch('/customer/reset-password', CustomerController.reset);
router.patch('/info', isAuthenticated, CustomerController.acceptInfo);

export default router;