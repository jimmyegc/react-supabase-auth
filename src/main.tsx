import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://kvgzqoewvhikvntvnitb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Z3pxb2V3dmhpa3ZudHZuaXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MjIxODAsImV4cCI6MjAzMzE5ODE4MH0.wy_l6mFyICYhFHNlvTFZDVUd-mJuR3iLAfRd2Lhe-E4")

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>,
)
