import React from 'react'
import { Link } from 'react-router-dom';
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';

function Header() {
  const user = useSelector(state => state?.user);
  console.log("user", user);
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
                <Logo w={90} h={50}/>
            </div>

            <div className='hidden lg:flex items-center justify-between w-full max-w-sm border rounded-full pl-2 focus-within:shadow-md'>
              <input type="text" placeholder='search product here...' className='w-full outline-none '/>
              <div className='text-lg text-white h-8 min-w-[50px] bg-red-600 flex items-center justify-center rounded-r-full'>
                <GrSearch />
              </div>
            </div>
            
            <div className='flex gap-7 items-center justify-center'>
              <div className='text-3xl cursor-pointer'>
                {
                  user?.profilepic ? (
                    <img src={user.profilepic} className='w-10 h-10 rounded-full' alt={user.name}/>
                  ) : (
                    <FaRegCircleUser/>
                  )
                }
              </div>
              <div className='text-2xl cursor-pointer relative'>
                <span><FaShoppingCart/></span>

                <div className='bg-red-600 text-white flex w-5 h-5 items-center justify-center rounded-full absolute -top-2 -right-3'>
                  <p className='text-sm'>0</p>
                </div>
              </div>
              <div>
              <Link to={"login"} className='bg-red-600 rounded-full text-white px-3 py-1 hover:bg-red-700'>
                Login
              </Link>
              </div>
            </div>
      </div>
    </header>
  )
}

export default Header