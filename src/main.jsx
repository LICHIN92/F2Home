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
import { Provider, useSelector } from 'react-redux'
import store from './redux/store'
import Profile from './pages/Profile/Profile'
import MyBooking from './pages/mybooking/MyBooking'
import DetailBookCancel from './pages/detailBookCancel/DetailBookCancel'
import LogoDisplay from './components/logoDisplay/LogoDisplay'
import ViewProfile from './pages/ViewProfile/ViewProfile'
import MobileChange from './pages/MobileChange/MobileChange'
import PasswordChange from './pages/PasswordChange/PasswordChange'
import Adminn from './pages/admin/Adminn'
import AuthAdmin from './components/authprotect/AuthAdmin'
import Orders from './pages/Orders/Orders'
import Edit_Item from './pages/Edit_item/Edit_Item'
import EditProduct from './pages/EditProduct/EditProduct'

// const user=useSelector(state=>state.user)
const router = createBrowserRouter([
  {
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: '/view/:item',
        element: <View />
      },
      {
        path: '/Book/:_id',
        element: <Book />
      },
      {
        path: "/login",
        element: <UserLogin />
      },
      {
        path: '/addItem',
        element: <ItemAdd />
      },
      {
        path: '/addproduct/:item',
        element: <Product />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: "/mybooking",
        element: <MyBooking />
      },
      {
        path: '/showOrCancel',
        element: <DetailBookCancel />
      },
      {
        path: '/ViewProfile',
        element: <ViewProfile />
      },
      {
        path: '/changeMobile',
        element: <MobileChange />
      },
      {
        path: '/changePassword',
        element: <PasswordChange />
      },
      {
        path: '/admin',
        element: (
          <AuthAdmin>
            <Adminn />
          </AuthAdmin>
        )
      },
      {
        path: '/orders',
        element: (
          <AuthAdmin>
            <Orders />
          </AuthAdmin>
        )
      },
      {
        path: '/editItem',
        element: (
          <AuthAdmin>
            <Edit_Item />
          </AuthAdmin>
        )
      },
      {
        path: '/editProduct',
        element: (
          <AuthAdmin>
            <EditProduct />
          </AuthAdmin>
        )
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
