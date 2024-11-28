import pool from '../config/db.js';// Conexión a la base de datos
class ProductRepository {
    getProducts = async (req, res) => {
        const response = await pool.query("SELECT * FROM tb_productos ORDER BY id ASC");
        return response.rows;
    };


    getProductById = async (req, res) => {
        const id = parseInt(req.params.id);
        const response = await pool.query("SELECT * FROM tb_productos WHERE id = $1", [id]);
        return response.rows;
    };



    async createProduct(product) {
        console.log('createProduct Producto recibido:', product.nombre);

        const query = 'INSERT INTO tb_productos (nombre,precio, categoria) VALUES ($1, $2,$3) RETURNING *';
        const values = [product.nombre, product.precio, product.categoria];
        const result = await pool.query(query, values);
        return result.rows[0];

    };

    updateProduct = async (req, res) => {
        const id = parseInt(req.params.id);
        const { nombre, precio, categoria } = req.body;

        const { rows } = await pool.query(
            "UPDATE tb_productos SET nombre = $1, precio = $2, categoria = $3 WHERE id = $4 RETURNING *",
            [nombre, precio, categoria, id]
        );

        return response.rows[0];
    };

    deleteProduct = async (req, res) => {
        const id = parseInt(req.params.id);
        const { rowCount } = await pool.query("DELETE FROM tb_productos where id = $1", [
            id,
        ]);

        if (rowCount === 0) {
            return null;
        }

        return response.rows[0];
    };

}
export default new ProductRepository();