import user from '../components/index.js'

export default function serverRoutes(app) {
  user(app);

  app.use((req, res, next) => {
    res.status(404);
    res.json({
      status: 'error',
      message: '404 Not Found'
    });
    next();
  });
}

