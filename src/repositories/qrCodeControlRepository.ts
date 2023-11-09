import appDataSource from "../data-source";
import QRCodeControl from "../entities/QRCodeControl";

const qrCodeRepository = appDataSource.getRepository(QRCodeControl);
export default qrCodeRepository;