
import './App.css'
import 'tailwindcss/tailwind.css';
import './output.css'
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/Login' element = {<Login/>}/>
        <Route path='/SignUp' element ={<SignUp/>}/>
      </Routes>
    </Router>
   

    </>
  )
}

export default App
