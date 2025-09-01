import { Router } from 'express';
import * as EducationController from '../controllers/education.controller';

const router = Router();

// Courses
router.get('/courses', EducationController.getAllCourses);
router.get('/courses/:id', EducationController.getCourseById);
router.post('/courses', EducationController.createCourse);
router.put('/courses/:id', EducationController.updateCourse);
router.delete('/courses/:id', EducationController.deleteCourse);

// Classes
router.get('/classes', EducationController.getAllClasses);
router.get('/classes/:id', EducationController.getClassById);
router.post('/classes', EducationController.createClass);
router.post('/classes/by-ids', EducationController.getClassesByIds);
router.put('/classes/:id', EducationController.updateClass);
router.delete('/classes/:id', EducationController.deleteClass);

// Certifications
router.get('/certifications', EducationController.getAllCertifications);
router.get('/certifications/:id', EducationController.getCertificationById);
router.post('/certifications', EducationController.createCertification);
router.put('/certifications/:id', EducationController.updateCertification);
router.delete('/certifications/:id', EducationController.deleteCertification);

// Learning Paths
router.get('/paths', EducationController.getAllLearningPaths);
router.get('/paths/:id', EducationController.getLearningPathById);
router.post('/paths', EducationController.createLearningPath);
router.put('/paths/:id', EducationController.updateLearningPath);
router.delete('/paths/:id', EducationController.deleteLearningPath);

export default router;
