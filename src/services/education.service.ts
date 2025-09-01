import supabase from '../integration/supabase.client';
import {
  Class,
  Course,
  Certification,
  LearningPath,
} from '../types/educational.types';

export const EducationService = {
  // ===== Courses =====
  async getAllCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getCourseById(id: string): Promise<Course> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

async createCourse(course: Partial<Course>): Promise<Course> {
  const payload = {
    title: course.title,
    description: course.description,
    duration: course.duration ?? 0,
    classes: course.classes ?? [],
    image_url: course.image_url ?? null, 
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  console.log("Creating course with sanitized payload:", payload);

  const { data, error } = await supabase
    .from('courses')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }

  return data;
}
,

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
       .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCourse(id: string): Promise<void> {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // ===== Classes =====
  async getAllClasses(): Promise<Class[]> {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getClassById(id: string): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
  async getClassesByIds(ids: string[]): Promise<Class[]> {
    const { data, error } = await supabase
    .from('classes')
    .select('*')
    .in('id', ids);

  if (error) throw error;
  return data;
}
,
async createClass(newClass: Partial<Class>): Promise<Class> {
  const { data, error } = await supabase
    .from('classes')
    .insert([{ ...newClass }])
    .select()
    .single();
  if (error) throw error;
  return data;
}
,

  async updateClass(id: string, updates: Partial<Class>): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteClass(id: string): Promise<void> {
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },


  // ===== Certifications =====
  async getAllCertifications(): Promise<Certification[]> {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getCertificationById(id: string): Promise<Certification> {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createCertification(cert: Partial<Certification>): Promise<Certification> {
    const { data, error } = await supabase
      .from('certifications')
      .insert([cert])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCertification(id: string, updates: Partial<Certification>): Promise<Certification> {
    const { data, error } = await supabase
      .from('certifications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCertification(id: string): Promise<void> {
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // ===== Learning Paths =====
  async getAllPaths(): Promise<LearningPath[]> {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getLearningPathById(id: string): Promise<LearningPath> {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

async createPath(path: Partial<LearningPath>): Promise<LearningPath> {
  const safePath = {
    ...path,
    steps: path.steps ?? []
  };

  const { data, error } = await supabase
    .from('learning_paths')
    .insert([safePath])
    .select() // ✅ This returns the inserted row(s)
    .single(); // ✅ Since you're only inserting one

  if (error) throw error;
  return data;
}
,
async updatePath(id: string, updates: Partial<LearningPath>): Promise<LearningPath> {
  const safeUpdates = {
    ...updates,
    steps: updates.steps ?? []
  };

  const { data, error } = await supabase
    .from('learning_paths')
    .update(safeUpdates)
    .eq('id', id)
    .select() 
    .single();

  if (error) throw error;
  return data;
}
,

  async deletePath(id: string): Promise<void> {
    const { error } = await supabase
      .from('learning_paths')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
