import appDataSource from "../data-source";
import QRCodeControl from "../entities/QRCodeControl";

const qrCodeControlRepository = appDataSource.getRepository(QRCodeControl);
export default qrCodeControlRepository;