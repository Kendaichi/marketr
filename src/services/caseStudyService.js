import { supabase } from "@/lib/supabase";

export const fetchCaseStudies = async () => {
  const { data, error } = await supabase
    .from("case_studies")
    .select("id, title, slug, client, industry, summary, metric, metric_label, cover_image_url")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const fetchCaseStudyBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) throw error;
  return data;
};
