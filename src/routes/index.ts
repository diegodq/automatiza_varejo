import express, { Router } from 'express';
import multer, { Multer } from "multer";
import ContactUsController from "../controllers/ContactUsController";
import CustomerController from "../controllers/CustomerController";
import CompanyController from "../controllers/CompanyController";
import SessionController from "../controllers/SessionController";
import isAuthenticated from "../middleware/isAuthenticated";
import WelcomeController from "../controllers/WelcomeController";
import avatarConfig from "../configurations/avatarConfig";
import configCompanyLogo from "../configurations/configCompanyLogo";
import AvatarController from "../controllers/AvatarController";
import DepartmentController from "../controllers/DepartmentController";
import QuestionController from "../controllers/QuestionController";
import AnswerController from "../controllers/AnswerController";
import TopicController from "../controllers/TopicController";
import QRCodeController from "../controllers/QRCodeController";
import LogoClientController from "../controllers/LogoClientController";
import ParamsQuestionController from "../controllers/ParamsQuestionController";
import ProductController from "../controllers/ProductController";
import NPSController from "../controllers/NPSController";
import HashDateController from "../controllers/HashDateController";
import ReportsController from "../controllers/ReportsController";
import ParamsProductController from "../controllers/ParamsProductController";
import DashboardController from '../controllers/DashboardController';
import StoreController from '../controllers/StoreController';
import CheckMultiStoreController from '../controllers/CheckMultiStoreController';
import QuestionGroupController from '../controllers/QuestionGroupController';
import QuestionGroupMappingController from '../controllers/QuestionGroupMappingController';
import isAuthenticatedCustomer from '../middleware/isAuthenticatedCustomer';
import PermissionController from '../controllers/PermissionController';
import RolesController from '../controllers/RolesController';

const uploadAvatar: Multer = multer(avatarConfig);
const uploadCompanyLogo: Multer = multer(configCompanyLogo);

const router:Router = express.Router();

router.get('/welcome', WelcomeController.welcome);
router.get('/customers', isAuthenticated, CustomerController.list);
router.get('/details', isAuthenticated, CustomerController.showDetailsCustomer);
router.get('/customer/:id', isAuthenticated, CustomerController.show);
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
router.get('/questions/:from?/:to?', isAuthenticated, QuestionController.listAll);
router.get('/answer', isAuthenticated, AnswerController.list);
router.get('/research/:from?/:to?/:store?', isAuthenticated, AnswerController.listResearch);
router.get('/answers/:from?/:to?/:store?', isAuthenticated, AnswerController.listAll);
router.get('/questions/binary/:from/:to/:id_store?', isAuthenticated, AnswerController.listQuestionsBinary);
router.get('/topic', isAuthenticated, TopicController.list);
router.get('/topics', isAuthenticated, TopicController.listAll);
router.get('/anchor-question', isAuthenticated, ParamsProductController.listAnchorQuestion);
router.get('/params/product', isAuthenticated, ParamsProductController.listParamsProduct);
router.get('/params/question/:question_id', isAuthenticated, ParamsQuestionController.listParams);
router.get('/product/company', isAuthenticated, ProductController.listProducts);
router.get('/params/questions', isAuthenticated, ParamsQuestionController.listParamsOfQuestion);
router.get('/list/store', isAuthenticated, StoreController.listStore);
router.get('/multi-store', isAuthenticated, CheckMultiStoreController.checkIfExistsMultiStore);
router.get('/info/store/:id_store', StoreController.getInfoStore);
router.get('/qrcode/:id_store?', isAuthenticated, QRCodeController.getQRCodeByStore);
router.get('/list/question/group', isAuthenticated, QuestionGroupController.list);
router.get('/list/group/mapping/:group_id', isAuthenticated, QuestionGroupMappingController.list);
router.get('/list/customer/company', isAuthenticated, CustomerController.listCustomerByCompany);
router.get('/list/permissions', PermissionController.listPermissionService); // put in the Trello, make documentation
router.get('/list/roles', RolesController.listRolesService); // put in the Trello, make documentation
router.get('/list/roles/customer/:id_customer', RolesController.listRoleByCustomer); // put in the Trello, make documentation
router.get('/list/permission/customer/:id_customer', PermissionController.listPermissionByCustomer); // put in the Trello, make documentation

//chart
router.get('/dashboard/topics/:from/:to/:type_tree/:id_store?', isAuthenticated, DashboardController.toAmountTopicInAnswers);
router.get('/dashboard/department/:from/:to/:type_tree/:id_store?', isAuthenticated, DashboardController.toAmountDepartmentInAnswers);
router.get('/dashboard/employee/:from/:to/:type_tree/:id_store?', isAuthenticated, DashboardController.toAmountEmployeesInAnswers);
router.get('/dashboard/research/:from/:to/:id_store?', isAuthenticated, DashboardController.toAmountResearch);
router.get('/dashboard/amount/month/:id_store?', isAuthenticated, DashboardController.returnVolumeOfResearchInMonths);
router.get('/dashboard/amount/research/:id_store?', isAuthenticated, DashboardController.returnResearchSevenDays);
router.get('/dashboard/amount/nps/:from/:to/:id_store?', isAuthenticated, DashboardController.toAmountNPS);

router.post('/customer', isAuthenticatedCustomer, CustomerController.create);
router.post('/new/permission', PermissionController.createPermission); // put in the Trello, make documentation
router.post('/add/permission/customer',);
router.post('/session', SessionController.create);
router.post('/forgot-password', CustomerController.send);
router.post('/company', isAuthenticated, CompanyController.create);
router.post('/contact-us', ContactUsController.sendNewMessage);
router.post('/department', isAuthenticated, DepartmentController.add);
router.post('/question', isAuthenticated, QuestionController.add);
router.post('/topic', isAuthenticated, TopicController.add);
router.post('/params/question', isAuthenticated, ParamsQuestionController.createParamsQuestion);
router.post('/add/product', isAuthenticated, ProductController.addNewProduct);
router.post('/link/company/product', isAuthenticated, CompanyController.linkCompanyToProduct);
router.post('/anchor/question', isAuthenticated, ParamsProductController.addAnchorQuestion);
router.post('/create/store', isAuthenticated, StoreController.create);
router.post('/create/question/group', isAuthenticated, QuestionGroupController.create);
router.post('/create/group/mapping', isAuthenticated, QuestionGroupMappingController.create);

router.delete('/customer', isAuthenticated, CustomerController.remove);
router.delete('/company', isAuthenticated, CompanyController.remove);
router.delete('/avatar', isAuthenticated, CustomerController.removeAvatarCustomer);
router.delete('/department', isAuthenticated, DepartmentController.delete);
router.delete('/question', isAuthenticated, QuestionController.remove);
router.delete('/answer', isAuthenticated, AnswerController.remove);
router.delete('/topic', isAuthenticated, TopicController.delete);
router.delete('/remove/store', isAuthenticated, StoreController.removeStore);
router.delete('/remove/question/group/:id', isAuthenticated, QuestionGroupController.remove);
router.delete('/remove/group/mapping/:id', isAuthenticated, QuestionGroupMappingController.remove);
router.delete('/remove/permission', PermissionController.removePermission); // put in the Trello, make documentation

router.put('/company', isAuthenticated, CompanyController.update);
router.put('/update/permission', PermissionController.updatePermission); // put in the Trello, make documentation
router.put('/customer', isAuthenticated, CustomerController.update);
router.put('/department', isAuthenticated, DepartmentController.update);
router.put('/question', isAuthenticated, QuestionController.edit);
router.put('/topic', isAuthenticated, TopicController.update);
router.put('/edit/store', isAuthenticated, StoreController.editStore);
router.put('/update/group/question', isAuthenticated, QuestionGroupController.update);

router.patch('/avatar', isAuthenticated, uploadAvatar.single('file'), AvatarController.update);
router.patch('/logo-company', isAuthenticated, uploadCompanyLogo.single('file'), LogoClientController.update);
router.patch('/customer/email', isAuthenticated, CustomerController.updateEmailCustomer);
router.patch('/customer/password', isAuthenticated, CustomerController.updatePasswordCustomer);
router.patch('/customer/reset-password', CustomerController.reset);
router.patch('/info', isAuthenticated, CustomerController.acceptInfo);
router.patch('/active-customer', CustomerController.ative);
router.patch('/topic', isAuthenticated, TopicController.changeStatus);
router.patch('/department', isAuthenticated, DepartmentController.changeStatus);
router.patch('/question', isAuthenticated ,QuestionController.changeStatus);
router.patch('/params/background-color', isAuthenticated, ParamsProductController.updateBackgroundColor);
router.patch('/params/font-color', isAuthenticated, ParamsProductController.updateFontColor);
router.patch('/params/passing/tree', isAuthenticated, ParamsProductController.changePassingTree);
router.patch('/resend-email', CustomerController.resendEmail);
router.patch('/params/boolean/question', isAuthenticated, ParamsQuestionController.updateBooleanParams);
router.patch('/indicate/employee', isAuthenticated, TopicController.updateIndicateEmployee);
router.patch('/anchor-question', isAuthenticated, ParamsProductController.updateAnchorQuestion);
router.patch('/update/lock-ip', isAuthenticated, ParamsProductController.updateLockByIp);
router.patch('/status/store', isAuthenticated, StoreController.disableStore);

// nps
router.get('/nps/header/:cnpj_company/:id_store?/:ip_address?', NPSController.listAnchorQuestionAndLogo);
router.get('/nps/topic/:cnpj_company', NPSController.listTopicByCompany);
router.get('/nps/departments/:cnpj_company', NPSController.listDepartmentsByCompany);
router.get('/nps/company/:cnpj_company/questions', NPSController.listQuestionAndParams);
router.get('/nps/product/params/:cnpj_company', NPSController.listProductByCompany);
router.get('/new/date', HashDateController.returnDateToHash);
router.post('/answer', AnswerController.add);
router.get('/list/store/:cnpj', StoreController.listStoreByCNPJ);
router.get('/multistore/:cnpj', CheckMultiStoreController.checkIfExistsMultiStoreByCNPJ);

// report
// router.get('/answer/report', AnswerController.makeReport);
router.get('/answer/report', ReportsController.makePDF);

export default router;