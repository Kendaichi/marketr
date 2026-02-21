import { supabase } from "@/lib/supabase";

export const submitContactForm = async (data) => {
  // const { error } = await supabase.from("leads").insert([{
  //   name: data.name,
  //   email: data.email,
  //   business_name: data.businessName ?? "",
  //   message: data.message,
  // }]);
  // if (error) throw error;
  return { success: true };
};
