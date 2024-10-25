
import './../App.css'
import 'tailwindcss/tailwind.css';
import './../output.css'
import { Link, useNavigate,  } from 'react-router-dom';
import { useState } from 'react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader, RingLoader } from 'react-spinners';



function Login() {
 const [loading, setLoading] = useState(false)


  const [error, setError] = useState('')
  {error&& <p>Error while trying to login...</p>}
 const navigate = useNavigate()
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState ('')

 const [resetEmailSent, setResetEmailSent] = useState(false); // State for password reset email confirmation

 const handleLogin = async(e)=>{
  e.preventDefault();
  try{
    setLoading(true)
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the user object
      console.log("Login successful:", user);
     setTimeout(() => {
      navigate('/home');
    }, 0); //delay
  }
  catch(error){
    const errorCode = error.code; // Get the error code
      // const error = error.message; // Get the error message
      console.error("Error during login:", errorCode, error);
      
      // Set error message for display
      setError(error);
      setLoading(false)
  }
  if (errorCode === 'auth/invalid-email') {
    setErrorMessage('The email address is not valid.');
  } else if (errorCode === 'auth/user-not-found') {
    setErrorMessage('No user found with this email.');
  } else if (errorCode === 'auth/wrong-password') {
    setErrorMessage('Incorrect password. Please try again.');
  } else {
    setErrorMessage(errorMessage);
  }
 }
// Handle Forgot Password reset request

const handleForgotPassword = async (e) =>{
  e.preventDefault();
 

  try {
    setLoading(true);
    await sendPasswordResetEmail(auth, email);
    setLoading(false)
    setResetEmailSent(true);
    setError(false)
  } catch (error) {
    console.error("Error sending password reset email", error)
    setError(error.message)
    setLoading(false)
  }
}



    return (
      <>
       {loading? (<div className='flex items-center justify-center min-h-screen'>
        <RingLoader color={'#4A90E2'} size={150}/>
       </div>):(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src='https://logopond.com/avatar/257420/logopond.png'
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-indigo-600">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-indigo-600">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
               
                
              </div>
  
              <div>
                <button
                onClick={handleLogin}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
              <div className="text-sm">
                    <button 
                    onClick={handleForgotPassword}
                    className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </button>
                  </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              New Here?{' '}
              <Link to = '/' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">SignUp</Link>
            </p>
            {resetEmailSent &&<p className='text-center text-sm text-green-600 mt-4'>Password reset Email sent successfully</p>}
            {error &&<p className='text-center text-sm text-red-600 mt-4'>An error occured...</p>}


          </div>
        </div>
       )}
      </>
       
    )
  }
  

export default Login
