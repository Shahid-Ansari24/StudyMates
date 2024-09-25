import React from 'react'
import websiteLogo from '../../assets/Logo/websiteLogo.png';
import { Link, matchPath } from 'react-router-dom';
import {NavbarLinks} from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path: route}, location.pathname);
  }

  return (
    <div className='flex h-14 item-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent item-center justify-between'>

        <Link to='/'>
            <img src={websiteLogo} alt="website logo" width={50} height={50}/>
        </Link>

        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              NavbarLinks.map( (link, index) => {
                return <li key={index}>
                  {
                    link.title === "Catalog" ? (<div></div>) : (
                      <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : 
                          "text-richblack-25"}`}>
                          {link.title}
                        </p>
                      </Link>
                    )
                  }
                </li>
              })
            }
          </ul>
        </nav>

        {/* LogIn/SignUp/Dashboard */}
        <div className='flex gap-x-4 item-center'>

        </div>
      </div>
    </div>
  )
}

export default Navbar
