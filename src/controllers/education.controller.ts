import { Request, Response } from 'express';
import { EducationService } from '../services/education.service';

// --------- Courses ---------
export const getAllCourses = async (_req: Request, res: Response) => {
  try {
    const data = await EducationService.getAllCourses();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.getCourseById(req.params.id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    console.log("Incoming course request body:", req.body);

    const course = await EducationService.createCourse(req.body);

    console.log("Created course:", course);

    res.status(201).json(course);
  } catch (err: any) {
    console.error("Error in createCourseController:", err);
    res.status(500).json({ message: err.message || "Erro ao salvar curso" });
  }
};


export const updateCourse = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.updateCourse(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    await EducationService.deleteCourse(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// --------- Classes ---------
export const getAllClasses = async (_req: Request, res: Response) => {
  try {
    const data = await EducationService.getAllClasses();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.getClassById(req.params.id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
export const getClassesByIds = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids;

    if (!Array.isArray(ids) || ids.length === 0) {
       res.status(400).json({ message: 'IDs must be a non-empty array' });
    }

    const data = await EducationService.getClassesByIds(ids);
    res.status(200).json(data);// <-- Ensure you return this response
  } catch (err: any) {
     res.status(500).json({ message: err.message });
  }
};


export const createClass = async (req: Request, res: Response) => {
  try {
     console.log("Incoming course request body:", req.body);
    const data = await EducationService.createClass(req.body);
     console.log("Created course:", data);
    res.status(201).json(data);
  } catch (err: any) {
     console.error("Error in creating class:", err);
    res.status(500).json({ message: err.message });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.updateClass(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    await EducationService.deleteClass(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};



// --------- Certifications ---------
export const getAllCertifications = async (_req: Request, res: Response) => {
  try {
    const data = await EducationService.getAllCertifications();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getCertificationById = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.getCertificationById(req.params.id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.createCertification(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.updateCertification(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  try {
    await EducationService.deleteCertification(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// --------- Learning Paths ---------
export const getAllLearningPaths = async (_req: Request, res: Response) => {
  try {
    const data = await EducationService.getAllPaths();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getLearningPathById = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.getLearningPathById(req.params.id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createLearningPath = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.createPath(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLearningPath = async (req: Request, res: Response) => {
  try {
    const data = await EducationService.updatePath(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteLearningPath = async (req: Request, res: Response) => {
  try {
    await EducationService.deletePath(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
