export default {
	params: {
		allowChangeCPF: false,
		allowChangeCNPJ: true,
		allowRemoveDepartments: true,
		allowRemoveQuestions: true,
		allowRemoveAnswers: false,
		validateNPSHeaderParams: false,
		validateGetQRCodeParams: true
	},
	jwt: {
		secret: '2100fb51e744832359d132e5b75afdc0',
		expiresIn: '23h'
	}
}