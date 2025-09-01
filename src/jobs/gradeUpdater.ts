import cron from 'node-cron';
import supabase from '../integration/supabase.client';

// Define the update function
async function triggerGradeUpdate() {
  const { error } = await supabase.rpc('update_all_member_grades');
  if (error) throw error;
  console.log("✅ Member grades updated successfully.");
}

// Schedule it to run every day at 2 AM
cron.schedule('0 2 * * *', async () => {
  try {
    console.log("⏰ Running daily grade update...");
    await triggerGradeUpdate();
  } catch (e) {
    console.error("❌ Grade update failed:", e);
  }
});
