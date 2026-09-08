import { Router } from 'express';
import {body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProductos, updateAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './milddleware';

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *        Product:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: ID of the product
 *              example: 1
 *            name:
 *              type: string
 *              description: Name of the product
 *              example: Monitor curvo de 49 pulgadas
 *            price:
 *              type: number
 *              description: Price of the product
 *              example: 199.99
 *            availability:
 *              type: boolean
 *              description: Availability of the product
 *              example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *    summary: Get all list of products
 *    tags:
 *      - Products 
 *    description: Return a list of products
 *    responses: 
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */


//Routing
router.get('/', getProductos)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product bases on its unique ID
 *      parameters:
 *          - in: path
 *            name: id
 *            desciption: The ID of the product to retrieve
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Invalid ID supplied
 *          404:
 *              description: Product not found
 */

router.get('/:id',
    param('id').isInt().withMessage('El id no válido'), 
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *   post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         name:
 *                             type: string
 *                             example: "Monitor curvo de 49 pulgadas"
 *                         price:
 *                            type: number
 *                            example: 199.99
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                 application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid input dat
 * 
 *          
 */

router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('El precio debe ser un número')
        .notEmpty().withMessage('El precio es obligatorio')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *      summary: Update a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to update
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         name:
 *                             type: string
 *                             example: "Monitor curvo de 49 pulgadas"
 *                         price:
 *                            type: number
 *                            example: 199.99
 *                         availability:
 *                            type: boolean
 *                            example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                 application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or input data
 *          404:
 *              description: Product not found
 */

router.put('/:id', 
    param('id').isInt().withMessage('El id no válido'), 
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('El precio debe ser un número')
        .notEmpty().withMessage('El precio es obligatorio')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),
    body('availability')
        .isBoolean().withMessage('La disponibilidad debe ser un valor booleano'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to update
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                 application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID 
 *          404:
 *              description: Product not found
 */
router.patch('/:id',
    param('id').isInt().withMessage('El id no válido'), 
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *      summary: Delete a product by a fiven ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                 application/json:
 *                    schema:
 *                       type: string
 *                       value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not found
 */
router.delete('/:id',
    param('id').isInt().withMessage('El id no válido'), 
    handleInputErrors,
    deleteProduct
)


export default router