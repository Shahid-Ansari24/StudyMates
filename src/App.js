import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-richblack-900'>
      <Routes>
        <Route path='/' element={<Home/>}/>
          
      </Routes>
    </div>
  );
}

export default App;
