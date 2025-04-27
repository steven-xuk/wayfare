// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cjvfiryzcajxixseaqvx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdmZpcnl6Y2FqeGl4c2VhcXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5ODE3NTYsImV4cCI6MjA1OTU1Nzc1Nn0.ZjdAqZf18-MRnDVPTAQWp8quMbyPgCUy3Nh2lj2PQMY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
