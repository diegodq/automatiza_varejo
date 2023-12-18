import appDataSource from "../data-source";
import QRCodeControl from "../entities/QRCodeControl";
import { Repository } from 'typeorm';

const qrCodeControlRepository: Repository<QRCodeControl> = appDataSource.getRepository(QRCodeControl);
export default qrCodeControlRepository;