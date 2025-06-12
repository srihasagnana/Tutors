import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import Registers from './components/student/Register'
import History from './components/student/Histroy'
import Courses from './components/student/Courses'
import Rootlayout from './components/Rootlayout'
import Login from './components/student/Login'
import Registert from './components/tutor/Register'
import Logint from './components/tutor/Logint'
import AddSchedule from './components/tutor/AddSchedule'
import Aboutus from './components/tutor/Aboutus'

function App() {
  const router=createBrowserRouter([
    {
      path:'',
      element:<Home />,
    },
    {
      path:'/',
      element:<Rootlayout />,
      children:[
        {
          path:'registers',
          element:<Registers />,
        },
        {
          path:'histroy',
          element:<History />,
        },
        {
          path:'courses',
          element:<Courses />,
        },
        {
          path:'login',
          element:<Login />,
        },
        {
          path:'registert',
          element:<Registert />,
        },
        {
          path:'logint',
          element:<Logint />,
        },
        {
          path:'addschedule',
          element:<AddSchedule />,
        },
        {
          path:'aboutus',
          element:<Aboutus />,
        },
      ]
    },
    
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
