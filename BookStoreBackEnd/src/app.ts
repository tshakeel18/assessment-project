import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as  cors from 'cors';

import {router as routes} from './routes/index';
import {setupAssociations} from './entity/associations';
import {processOrder} from './queues/orderProcessor';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerFile from './swagger_output.json';
import { sequelize } from './database/connection';

export const app = express();
app.use(express.json());

// Enable cors to be used for all domains for development purpose
app.use(cors());

app.use(bodyParser.json());
app.use('/', routes);

// Call the setupAssociations function to define associations between models
setupAssociations(sequelize);

// Start the order processor to consume orders from RabbitMQ queue
processOrder();

// Api for swagger document
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// App Listener on port 3001
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3000');
});
