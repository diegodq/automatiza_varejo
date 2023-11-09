import { body } from 'express-validator';

export const validateCreateCustomer = [
	body('first_name').exists({ checkFalsy: true }).isLength({ min: 4}).trim(),
	body('surname').exists({ checkFalsy: true }).isLength({ min: 4}).trim(),
	body('position').exists({ checkFalsy: true }).isLength({ min: 4}).trim(),
	body('phone').exists({ checkFalsy: true }).isLength({ min: 11 }).trim(),
	body('email').exists({ checkFalsy: true }).isEmail().trim(),
	body('password').exists({ checkFalsy: true }).isLength({ min: 3 }).trim(),
	body('accept_terms').isBoolean().trim()
];

export const validateSession = [
	body('email').exists({ checkFalsy: true }).isEmail().trim(),
	body('password').exists({ checkFalsy: true }).isLength({ min: 6 }).trim()
];

export const validateForgotPassword = [
	body('email').exists({ checkFalsy: true }).isEmail().trim()
]

export const validateCreateCompany = [
	body('corporate_name').exists({ checkFalsy: true }).isLength({ min: 4}).trim(),
	body('fantasy_name').exists({ checkFalsy: true }).isLength({ min: 4}).trim(),
	body('cnpj').exists({ checkFalsy: true }).isLength({ min: 14 }).trim(),
	body('zip_code').exists({ checkFalsy: true }).isLength({ min: 8 }).trim(),
	body('state').exists({ checkFalsy: true }).isLength({ min: 2}).trim(),
	body('address').exists({ checkFalsy: true }).isLength({ min: 3}).trim(),
	body('complement').optional().trim(),
	body('number').optional().trim(),
	body('district').exists({ checkFalsy: true }).isLength({ min: 3}).trim(),
	body('city').exists({ checkFalsy: true }).isLength({ min: 3}).trim()
]

export const validateContactUS = [
	body('name').exists({ checkFalsy: true }).isLength({ min: 3}).trim(),
	body('email').exists({ checkFalsy: true }).isEmail().trim(),
	body('subject').exists({ checkFalsy: true }).isLength({ min: 3 }).trim(),
	body('message').exists({ checkFalsy: true }).isLength({ min: 3 }).trim(),
]

export const validateCreateQuestion = [
	body('title_question').exists({ checkFalsy: true }).isLength({ min: 5}).trim(),
	body('tree_question').exists({ checkFalsy: true }).isNumeric().trim(),
	body('question_description').exists({ checkFalsy: true }).isLength({ min: 5 }).trim(),
	body('status').exists({ checkFalsy: true }).isNumeric().trim(),
	body('text_end_research').exists({ checkFalsy: true }).isLength({ min: 8 }).trim(),
	body('text_label_one').exists({ checkFalsy: true }).isLength({ min: 4 }).trim(),
	body('text_label_two').exists({ checkFalsy: true }).isLength({ min: 3}).trim(),
	body('research_title').exists({ checkFalsy: true }).isLength({ min: 9 }).trim()
]

export const validateCreateTopic = [
	body('name').exists({ checkFalsy: true }).isLength({ min: 3}).trim(),
	body('status').exists({ checkFalsy: true }).isLength({ min: 3}).trim()
]

export const validateGenerateQrCode = [
	body('cnpj').exists({ checkFalsy: true }).isLength({ min: 14 }).trim()
]

export const validateCreateParamsQuestion = [
	body('option_one').exists({ checkFalsy: true }).isLength({ min: 10 }).trim(),
	body('option_two').exists({ checkFalsy: true }).isLength({ min: 10 }).trim(),
	body('import_type').exists({ checkFalsy: true }).isLength({ min: 5 }).trim(),
	body('position').exists({ checkFalsy: true }).isNumeric().isLength({ min: 1 }).trim(),
	body('mandatory_question').exists({ checkFalsy: true }).isNumeric().isLength({ min: 1 }).trim(),
	body('finish_research').exists({ checkFalsy: true }).isNumeric().isLength({ min: 1 }).trim(),
	body('question').exists({ checkFalsy: true }).isLength({ min: 1 }).isLength({ min: 1 }).trim()
]

export const validateAddParamsController = [
	body('background_color').exists({ checkFalsy: true }).isLength({ min: 5}).trim(),
	body('font_color').exists({ checkFalsy: true }).isLength({ min: 5}).trim()
]

export const validateAddProduct = [
	body('name').exists({ checkFalsy: true }).isLength({ min: 3}).trim(),
	body('description').exists({ checkFalsy: true }).isLength({ min: 10}).trim()
]

export const validateAddStore = [
	body('name')
		.isLength({ min: 2}).withMessage('Endereço da loja deve ter pelo menos 3 número')
		.trim(),

	body('address')
		.isLength({ min: 2}).withMessage('Endereço da loja deve ter pelo menos 3 número')
		.trim(),

		body('store_number')
		.isNumeric().withMessage('Número da loja inválido')
		.isLength({ min: 1}).withMessage('Número da loja deve ter pelo menos 1 número')
		.trim()
]

export const validateLinkedProducts = [
	body('company').exists({ checkFalsy: true }).isLength({ min: 1}).trim(),
	body('product').exists({ checkFalsy: true }).isLength({ min: 1}).trim()
]