import multer from "multer";
import path from "path";
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', 'companyLogo');

export default {
	directory: uploadFolder,
	storage: multer.diskStorage({
		destination: uploadFolder,
		filename(request, file, callback) {
			const id = request.userId;
			const filehash: string = crypto.randomBytes(18).toString('hex');
			const extensionFile = file.originalname.split('.')[1];
			callback(null, `${filehash}.${id}.${extensionFile}`);
		},
	}),
}