import express from 'express';
import routes from './src/routes/postRoutes.js';

const app = express();
app.use(express.static('uploads'));
routes(app);

// porta 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
