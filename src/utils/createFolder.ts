import path from 'path';
import fs from 'fs';

function createFolder(directories: Array<string>)
{
	directories.forEach(folder => {
		const folders = fs.existsSync(path.join(__dirname, '..', `/${folder}`));
		if(!folders) {
			fs.mkdirSync(path.join(__dirname, '..', `/${folder}`));
			console.log(`${folder} directory created`);
		}
	})
}

export default createFolder;