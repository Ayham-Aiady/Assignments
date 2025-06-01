import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/error.js';
import './config/db.js';
import passport from './config/passport.js';
// Import utilities
import { createResponse } from './utils/helpers.js';

const app = express();



// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(passport.initialize());
app.use(passport.session());


// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: createResponse(false, 'Too many requests', null, 'Rate limit exceeded'),
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);


// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Root endpoint
app.get('/', (req, res) => {
  res.json(createResponse(true, 'OAuth 2 Google Authentication API', {
    version: '1.0.0',
    endpoints: {
      auth: '/auth/google',
      callback: '/auth/google/callback',
      user: '/auth/user',
      logout: '/auth/logout',
      profile: '/user/profile'
    }
  }));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;