import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import MainPage from './pages/mainpage/MainPage'
import View from './pages/view/View'
import Book from './pages/Book/Book'
import UserLogin from './pages/userLogin/UserLogin'
import ItemAdd from './pages/addItem/ItemAdd'
import Product from './pages/Addproduct/Product'
import { Provider } from 'react-redux'
import store from './redux/store'
import Profile from './pages/Profile/Profile'
import MyBooking from './pages/mybooking/MyBooking'
import DetailBookCancel from './pages/detailBookCancel/DetailBookCancel'
const router = createBrowserRouter([
  {
    element: <MainPage/>,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path:'/view/:item',
        element:<View/>
      },
      {
        path:'/Book/:_id',
        element:<Book/>
      },
      {
        path:"/login",
        element:<UserLogin/>
      },
      {
        path:'/addItem',
        element:<ItemAdd/>
      },
      {
        path:'/addproduct/:item',
        element:<Product/>
      },
      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:"/mybooking",
        element:<MyBooking/>
      },
      {
        path:'/showOrCancel',
        element:<DetailBookCancel/>
      }
     
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
