import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../services/supabase.service'

const CND_URL = import.meta.env.VITE_CDN_URL
export const Login = () => {
  const user = useUser()
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState("")
  const [images, setImages] = useState([])

  const magicLinkLogin = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email
    })
    console.log(data)
    if (error) {
      alert("Error communicating with supabase, make sure to use a real email address.")
      console.log(error)
    } else {
      alert("Check your email for a Superbase Magic Link to log in!")
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
    } catch (error) {
      alert(error.message)
    }
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0]
    const { data, error } = await supabase
      .storage
      .from('uploads')
      .upload(user.id + "/" + uuidv4(), file)

    if (data) {
      getImages()
    } else {
      console.log(error)
    }
  }

  const getImages = async () => {

    const { data, error } = await supabase
      .storage
      .from("uploads")
      .list(user?.id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" }
      })
    if (data !== null) {
      console.log(data)
      setImages(data)
    } else {
      console.log(error)
    }
  }

  const deleteImage = async (imageName) => {
    const { error } = await supabase
      .storage
      .from("uploads")
      .remove([user.id + "/" + imageName])
    if (error) {
      alert(error)
    } else {
      getImages()
    }
  }

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('username')
        .eq('id', user?.id)
        .single()
      if (error) throw error
      if (data) {
        console.log(data.username)
      }
    } catch (error) {
      alert(error.message)
    } finally {

    }
  }

  useEffect(() => {
    if (user) {
      console.log(user)
      getImages()
    }
  }, [user])

  return <>

    {
      user === null ? <>
        <h1>Welcome to ImageWall</h1>
        <p>Enter an email to sign in with a Supabase Magic Link</p>
        <form onSubmit={magicLinkLogin}>
          <input type="email" placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)} />
          <button
          >Get Magic Link</button>
        </form>
      </>
        :
        <>
          <h1>Your ImageWall</h1>
          <p>Current user: {user.email}</p>
          <button
            className='bg-blue-600 text-white'
            onClick={() => signOut()}>Sign out</button>
          <form>
            <input type="file" accept='image/png image/jpeg' onChange={(e) => uploadImage(e)} />
          </form>
          <h3>Your images</h3>
          <hr />
          {images.map((image) => (
            <div key={CND_URL + user.id + "/" + image.name} className='border-b-2 border-3'>
              {/* {JSON.stringify(image)} */}
              <img src={CND_URL + user.id + "/" + image.name} alt="" className='w-1/2' />
              <button onClick={() => deleteImage(image.name)} className='mt-2 text-red-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

              </button>
            </div>
          ))}
        </>
    }
  </>

}