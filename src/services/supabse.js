import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dbphnwbgpyndtfljpwkv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGhud2JncHluZHRmbGpwd2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNjkzMzcsImV4cCI6MjAzOTc0NTMzN30.sQxJNZHXa17Cy_Zfosg7GSeKVhwJr-zgeUNQdxIu10k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
