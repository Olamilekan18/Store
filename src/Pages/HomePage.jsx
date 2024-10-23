import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SignUp from './Signup';
import { Button, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { RingLoader } from 'react-spinners';
import ProductComponent from '../Components/ProductComponent';

// const navigate = useNavigate();

const navigation = [
  { name: 'Home', href: '#', current: true, onClick: () => navigate('/home')},
  { name: 'Favorites', href: '#', current: false, onclick: handleFavorites},
  { name: 'Cart', href: '#', current: false, onClick: handleCart  },
  { name: 'Account', href: '#', current: false,  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function handleFavorites() {
    console.log("Added to Favorites")
}

function handleCart() {
    console.log("Added to cart")
  }

function Home() {

   

  const[loading, setLoading] = useState(false)

  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser)
            {      setUser(currentUser);
          }else{
            setUser(null)
          }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/')
  };

function handleCart() {
  console.log("Added to cart")
}
  // Fetching products

 
    const[product, setProduct] = useState(null);

    useEffect(()=>{
      const fetchProduct = async () => {
        try {
        setLoading(true)
          
          const response = await fetch('https://fakestoreapi.com/products/3')
          const data = await response.json();
          setProduct(data)
        } catch (error) {
          console.error('Error fetching product:', error)
        }
        finally{
          setLoading(false)
        }
      }
      fetchProduct()
    },[])
  
    // if(!loading){
    //   return <div>No data found...</div>
    // }



  return (
    <div className="h-screen w-screen m-3 flex flex-col">
        {loading? (<div className='flex items-center justify-center min-h-screen'>
        <RingLoader color={'#4A90E2'} size={150}/>
       </div>): (
            user ? (
                <>
                    <h1 className='mb-4 '>Welcome, {user.displayName ? user.displayName : 'User'}</h1>

                    <Disclosure as="nav" className="bg-gray-800 flex-auto top-0 sticky">
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-grey-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                        <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                    </DisclosureButton>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            alt="Your Company"
                                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                            className="h-8 w-auto"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <button
                                                    key={item.name}
                                                    onClick={item.onClick}
                                                    href={item.href}
                                                    // aria-current={item.current ? 'page' : undefined}
                                                    className={classNames(
                                                        !item.current ? 'bg-gray-900 text-white' : 'text-gray-300 bg-gray-600 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                      )}
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open user menu</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6 fill-white"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                    />
                                                </svg>
                                            </MenuButton>
                                        </div>
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <MenuItem>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                                                    Your Profile
                                                </a>
                                            </MenuItem>
                                            <MenuItem>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                                                    Settings
                                                </a>
                                            </MenuItem>
                                            <MenuItem>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                                                    Sign out
                                                </a>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </Disclosure>

                    {/*   Products */}

                   <ProductComponent/>
                    <button onClick={handleLogout} className='bg-sky-500 hover:bg-red-700 text-white bottom-20 flex-col py-1 px-2 text-sm rounded'>
                        Logout
                    </button>
                </>
            ) : (
                <SignUp />
            )
        )}
    </div>
);
}

export default Home;