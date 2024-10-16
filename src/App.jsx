
import './App.css'
import 'tailwindcss/tailwind.css';
import './output.css'
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/HomePage';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/Login' element = {<Login/>}/>
        <Route path='/' element ={<SignUp/>}/>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

      </Routes>
    </Router>
   

    </>
  )
}

export default App
