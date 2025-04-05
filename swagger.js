const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Events API',
    description: 'Team project CSE341, team 8'
  },
  host:"",
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local Server"
    },
    {
      url: "https://cse341-events-vmzz.onrender.com",
      description: "Render Server"
    }
  ],
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);