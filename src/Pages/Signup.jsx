
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
  
          }, 100);        }
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
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={(e)=>setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
  
            <p className="mt-10 text-center text-sm text-gray-500">
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
