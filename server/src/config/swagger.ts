import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products",
                description: "API Operations related to products"
            }
        ],
        info: {
            title: "API REST Node.js + TypeScript + Express",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}
const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        /* Oculta la imagen original de Swagger */
        .topbar-wrapper .link img {
            display: none;
        }
        
        /* Aplica la nueva imagen en el contenedor */
        .topbar-wrapper .link {
            content: url('https://cdn-icons-png.flaticon.com/512/732/732397.png');
            height: 40px;
            width: auto;
        }
    `,
    customSiteTitle: "Documentación REST API Express / TypeScript",
};

export default swaggerSpec;
export { swaggerUiOptions };