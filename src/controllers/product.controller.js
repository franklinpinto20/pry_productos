import Joi from 'joi';
import { productService } from "../services/productService.js";

export const getProducts = async (req, res) => {
  try {
    const response = await productService.getProducts();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await productService.getProductById();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// Validación de los datos con Joi
const productSchema = Joi.object({
  nombre: Joi.string().min(3).max(30).required(),
  categoria: Joi.string().min(1).max(2).required(),
  precio: Joi.number()
  .precision(2) // Limita a dos decimales
  .greater(0) // Asegura que el valor sea mayor a 0
  .required() // Marca el campo como obligatorio
});

export const createProduct = async (req, res) => {
  try {

    // Validación de los datos recibidos en el cuerpo de la solicitud
    const { error, value } = productSchema.validate(req.body);

    // Si hay un error en la validación, enviamos un error 400
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const productData = req.body;
   
    console.log('Producto recibido:', productData.nombre);
    const response = await productService.createProduct(productData);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { nombre, precio, categoria } = req.body;

    const response = await productService.updateProduct();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await productService.updateProduct();

    if (response === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};