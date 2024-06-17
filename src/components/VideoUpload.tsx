import { useEffect, useState } from "react"
import { supabase } from "../services/supabase.service"
import { v4 as uuidv4 } from 'uuid'

const CDNURL = "https://kvgzqoewvhikvntvnitb.supabase.co/storage/v1/object/public/videos/"
export const VideoUpload = () => {

  const [videos, setVideos] = useState([])

  const getVideos = async () => {
    const { data, error } = await supabase
      .storage
      .from("videos")
      .list('')

    if (data !== null) {
      setVideos(data)
    } else {
      console.log(error)
      alert("Error grabbing files from Supabase")
    }
  }

  const handleFileChange = async (e) => {
    const videoFile = e.target.files[0]
    const { error } = await supabase.storage
      .from("videos")
      .upload(uuidv4() + ".mp4", videoFile)
    if (error) {
      console.log(error)
      alert("Error uploading file to Supabase")
    }
  }

  useEffect(() => {
    getVideos()
  }, [])

  return (<>
    <h2>VideoUpload</h2>
    <input type="file" accept="video/mp4" onChange={handleFileChange} />
    {/*  <button onClick={handleUpload} disabled={uploading}>
      {uploading ? "Uploading..." : "Upload"}
    </button> */}
    <hr />
    {videos.map((video) => {
      console.log(video)
      return (
        <>
          <video height="380px" controls>
            <source src={CDNURL + video.name} type="video/mp4" />
          </video>
        </>
      )
    })}


  </>)
}