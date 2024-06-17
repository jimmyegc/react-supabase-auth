
import './App.css'
import { FileUpload } from './components/FileUpload'
import { Login } from './components/Login'
import { LoginWithPassword } from './components/LoginWithPassword'
import { TodoList } from './components/TodoList'
import { VideoUpload } from './components/VideoUpload'

function App() {

  return (

    <main className='flex items-center justify-center mx-20 my-5'>
      <div className='flex flex-col max-w-xl gap-4 w-full'>
        {/* <TodoList></TodoList>
        <FileUpload></FileUpload>
        <Login />
        <LoginWithPassword /> */}
        <VideoUpload />
      </div>
    </main>

  )
}

export default App
