import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Admin from './Components/Admin/Admin';
import ErrorLayout from './Components/ErrorLayout/ErrorLayout';
import Addachievement from './Components/Addachievement/Addachievement';
import Allachievements from './Components/Allachievements/Allachievements';
import Achievementpage from './Components/Achievementpage/Achievementpage';
function App() {
  let router=createBrowserRouter([
    {
      path:'',
      element:<Admin />,
      errorElement:<ErrorLayout />,
      children:[
        {
          path:'',
          element:<Allachievements />
        },
        {
          path:'addachievements',
          element:<Addachievement />
        },
        {
          path:'achievement/:achievementId',
          element:<Achievementpage />
        }
      ]
    }
  ])
  return (
    <div className='app'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
