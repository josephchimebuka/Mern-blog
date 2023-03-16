import './App.css';
import Layout from './components/Layout';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import AllPost from './components/AllPost';
import Register from './pages/Register';
import { UserContextProvider } from './UserContext';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <UserContextProvider>
   <Router>
      <div className='App'>
      <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<AllPost/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/create' element={<CreatePost/>} />
          </Route>
        </Routes>
      </div>
    </Router>
    </UserContextProvider>
 
  );
}

export default App;
