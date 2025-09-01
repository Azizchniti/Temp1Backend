export type ContentType = "course" | "class" | "certification" | "path";

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  created_at: string;
  updated_at: string;
}

export interface Course extends EducationalContent {
  type: "course";
  classes: string[];
  duration: number;
    image_url?: string;
}

export interface Class extends EducationalContent {
  type: "class";
  video_url?: string;
  duration: number;
  materials: string[];
}

export interface Certification extends EducationalContent {
  type: "certification";
  required_courses: string[];
  max_attempts: number;
}

export interface LearningPath extends EducationalContent {
  type: "path";
  steps: Array<{
    contentId: string;
    contentType: "course" | "certification";
    order: number;
  }>;
}
