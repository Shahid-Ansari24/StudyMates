import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import OpenRoute from './components/core/Auth/OpenRoute'
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Settings from './components/core/Dashboard/Settings/index';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/Cart/index';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-richblack-900'>
      <Navbar/>
      <Routes>

        <Route path='/' element={<Home/>}/>

        <Route path='auth/login' 
        element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        }/>

        <Route path='auth/signup' 
        element={
          <OpenRoute>
            <SignUp/>
          </OpenRoute>
        }/>

        <Route path='/forgot-password' 
        element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }/>

        <Route path='/update-password/:id' 
        element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        }/>


        <Route path='/verify-email' 
        element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }/>


        <Route path='/about' 
        element={
          <OpenRoute>
            <About/>
          </OpenRoute>
        }/>

        <Route 
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
        >
          <Route path='/Dashboard/My-Profile'
            element={
                <MyProfile />
            }/>
          <Route path='/Dashboard/Settings'
            element={
                <Settings/>
            }/>
            <Route path='/Dashboard/Enrolled-Courses'
            element={
              <EnrolledCourses/>
            }/>
            <Route path='/Dashboard/Cart'
            element={
              <Cart/>
            }/>
            <Route path='/Dashboard/Instructor'
            element={
              <Instructor/>
            }/>
          
        </Route>





        <Route path='*'
        element={
          <Error/>
        }/>

      </Routes>
    </div>
  );
}

export default App;
