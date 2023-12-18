import productRepository from "../repositories/productRepository";
import Product from '../entities/Product';

type ProductsTypes = {
	name: string;
	description: string;
}

export default async function addProducts(products: Array<ProductsTypes>) {
	const product: Product[] = await productRepository.find();
	if(product.length > 0) {
		console.log('already products added');
	} else {
		try {
			const newProducts: Product[] = productRepository.create(products);
			await productRepository.save(newProducts);

			console.log('new products added');
		} catch(error) {
			console.log(error);
		}
	}
}