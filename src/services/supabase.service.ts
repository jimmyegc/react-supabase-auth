import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase.types";
const supabaseUrl = "https://kvgzqoewvhikvntvnitb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Z3pxb2V3dmhpa3ZudHZuaXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MjIxODAsImV4cCI6MjAzMzE5ODE4MH0.wy_l6mFyICYhFHNlvTFZDVUd-mJuR3iLAfRd2Lhe-E4"; //process.env.SUPABASE_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
