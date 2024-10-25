
import './../App.css'
import 'tailwindcss/tailwind.css';
import './../output.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth';

function SignUp() {
  const [loading, setLoading] = useState(false)
    const  [error, setError] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const handleSignup = async(e)  =>{
        e.preventDefault();
        try{
          setLoading(true)
           const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            await updateProfile(user, {displayName:name})
          setTimeout(() => {
             navigate('/home')
  
          }, 0);        }
        catch(error){
            if (error.message === 'Firebase: Error (auth/email-already-in-use).'){
                setError('This email has been already registered')
            }
            setError(error.message)
            setLoading(false)
        }
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () =>{
      setShowPassword((prev) => !prev)
    }
   
    return (
      <>
     {loading? (<div className='flex items-center justify-center min-h-screen'>
        <RingLoader color={'#4A90E2'} size={150}/>
       </div>):(
      //  {error && <p>{error}</p>}
       
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src='https://logopond.com/avatar/257420/logopond.png'
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up to an account
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
                    onChange={(e)=>setEmail(e.target.value)}
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
                <div className="mt-2 relative flex">
                  <input
                    id="password"
                    name="password"
                    type={showPassword? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    onChange={(e)=>setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                 <svg
                 id='login-svg'
                   width="20"
                  // className=" login-svg size-6 absolute inset-y-0 right-0 top-2  ml-3 flex items-center cursor-pointer"
                 onClick={handleTogglePassword} class xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  {showPassword ?  'Hide' : 'Show'   }
</svg>

                </div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-indigo-600">
                    Name
                  </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="current-password"
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                onClick={handleSignup}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
              <div className="text-sm">
                    
                  </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-indigo-600">
              Have an account?{' '}
              <Link to = '/Login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
            </p>
          </div>
        </div>
       )}
      </>
    )
  }
  

export default SignUp


