import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

import announcementRoutes from './routes/announcement.routes';
import announcementViewsRoutes from './routes/announcementviews.routes';
import uploadRoutes from './routes/uploads';
import educationRoutes from './routes/education.routes';

import cors from 'cors';
import './jobs/gradeUpdater'; 
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/announcementsviews', announcementViewsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/education', educationRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
