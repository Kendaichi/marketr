/**
 * Submit contact form data.
 * Currently a placeholder — swap this implementation for a real backend call
 * when the backend is connected (e.g. a Supabase insert or API request).
 */
export const submitContactForm = async (data) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: Replace with real backend call
  // e.g. axiosClient.post('/leads', data)
  console.log("Contact form submitted:", data);
  return { success: true };
};
