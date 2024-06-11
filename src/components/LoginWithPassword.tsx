import { useEffect, useState } from "react"
import { supabase } from "../services/supabase.service"
import { useUser } from "@supabase/auth-helpers-react"

export const LoginWithPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const user = useUser()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email, password
    })
    if (error) throw error
    console.log(data.user)
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const updates = {
      id: user.id,
      username: name,
      updated_at: new Date()
    }
    const { error } = await supabase.from('profiles').upsert(updates)
  }


  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user?.id)
        .single()
      if (error) throw error
      if (data) {
        setName(data.username)
        console.log(data.username)
      }
    } catch (error) {
      alert(error.message)
    } finally {

    }
  }

  useEffect(() => {
    if (user) {
      getProfile()
      console.log(user)
    }
  }, [user])

  return <>
    {user === null ? <>
      <h2>Register With Password</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Your email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
    </>
      :
      <>
        {user.email} - {name}
        <form onSubmit={handleUpdateProfile}>
          <input type="text" placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>Update Profile</button>
        </form>

      </>
    }

  </>
}