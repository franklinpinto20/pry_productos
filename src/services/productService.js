
import productRepository from '../repositories/productRepository.js';

class ProductService {
  

    async getProducts() {
        return await productRepository.getProducts();
    }


    async getProductById() {
        return await productRepository.getProductById();
    };


    async createProduct(product) {
        console.log('Producto recibido:', product.nombre);
        return await productRepository.createProduct(product);
    }

    async updateProduct() {
        return await productRepository.updateProduct();
    };

    async deleteProduct() {
        return await productRepository.deleteProduct();
    };

}
export const productService = new ProductService();