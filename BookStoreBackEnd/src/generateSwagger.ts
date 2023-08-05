const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger_output.json';

const endpointsFiles = ['./routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log('Swagger API documentation has been generated!');
});