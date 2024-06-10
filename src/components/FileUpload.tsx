import { useState } from "react"
import { supabase } from "../services/supabase.service"
//https://www.youtube.com/watch?v=25hbImI36zA
export const FileUpload = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [fileURL, setfileURL] = useState("")

  const handleFileChange = event => {
    setFile(event.target.files[0])
  }

  const handleUpload = async () => {
    try {
      setUploading(true)
      if (!file) {
        alert("Please select a file to upload...")
        return
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { data, error } = await supabase.storage.from("uploads").upload(filePath, file)
      if (error) {
        throw error
      }
      const { data: url } = await supabase.storage.from("uploads").getPublicUrl(filePath)
      console.log(url.publicUrl)

      setfileURL(url.publicUrl)
      alert('file uploaded succcessfully')
    } catch (error) {
      console.log("Error uploading file:", error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="border-solid border-2 border-slate-500 p-4">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {fileURL && (
        <div>
          <p>File uploaded to: {fileURL}</p>
          <img src={fileURL} alt="Uploaded file"
            style={{ width: '300px', height: "auto" }}
          />
        </div>
      )}
    </div>
  )
}