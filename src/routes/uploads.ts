import express, { Request, Response } from 'express';
import multer from 'multer';
import supabase from '../integration/supabase.client';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post(
  '/profile-picture/:userId',
  upload.single('image'),
  async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
    const { userId } = req.params;
    const file = req.file;

    console.log("Upload request received for user:", userId); // ✅ Debug log

    if (!file) {
      console.error('No file uploaded');
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const filePath = `${userId}/${file.originalname}`;
    console.log("Uploading file:", filePath); // ✅ Debug log

    const { error: uploadError } = await supabase.storage
      .from('profilepictures')
      .upload(filePath, file.buffer, {
        upsert: true,
        contentType: file.mimetype,
      });

    if (uploadError) {
      console.error("Error uploading to Supabase storage:", uploadError); // ✅ Debug log
      res.status(500).json({ error: uploadError.message });
      return;
    }

    const { data: publicUrl } = supabase
      .storage
      .from('profilepictures')
      .getPublicUrl(filePath);

    console.log("Public URL generated:", publicUrl?.publicUrl); // ✅ Debug log

    const { error: updateError } = await supabase
      .from('members') // ✅ Correct table
      .update({ profile_picture: publicUrl.publicUrl })
      .eq('id', userId);

    if (updateError) {
      console.error("Error updating member record:", updateError); // ✅ Debug log
      res.status(500).json({ error: updateError.message });
      return;
    }

    console.log("Profile picture updated successfully for user:", userId); // ✅ Debug log
    res.json({ url: publicUrl.publicUrl });
  }
);

router.post(
  '/course-image/:courseId',
  upload.single('image'),
  async (req: Request<{ courseId: string }>, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const filePath = `${courseId}/${file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from('coursesimages') // your new bucket
      .upload(filePath, file.buffer, {
        upsert: true,
        contentType: file.mimetype,
      });

    if (uploadError) {
      res.status(500).json({ error: uploadError.message });
      return;
    }

    const { data: publicUrl } = supabase
      .storage
      .from('coursesimages')
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from('courses') // ✅ Update the correct table
      .update({ image_url: publicUrl.publicUrl }) // ✅ Use your column name
      .eq('id', courseId);

    if (updateError) {
      res.status(500).json({ error: updateError.message });
      return;
    }

    res.json({ url: publicUrl.publicUrl });
  }
);

export default router;
