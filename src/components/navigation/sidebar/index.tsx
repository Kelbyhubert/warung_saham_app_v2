import React from 'react'
import SideMenu from './sidemenu'
import Profile from './profile'
import { Menu } from '@/types/Menu';

const index : React.FC = () : React.ReactNode => {
    const listMenu: Menu[] = [
        {
          id: 1,
          name: "Dashboard", 
          url:'/dashboard', 
          subMenu: null
        },
        {
          id: 2,
          name: "Warung Saham", 
          url:null, 
          subMenu: [
             {id: 5 , name: 'Rekom', url: '/warung-saham/rekom',subMenu: null},
             {id: 6 , name: 'Insight', url: '/warung-saham/insight',subMenu: null},
             {id: 7 , name: 'Stock', url: '/warung-saham/stock',subMenu: null},
          ]
        },
        // {
        //   id: 2,
        //   name: "Daur Uang", 
        //   url:null, 
        //   subMenu: [
        //      {id: 5 , name: 'Banner', url: '/daur/rekom',subMenu: null},
        //   ]
        // },
        {
          id: 3,
          name: "User Management", 
          url:'/user-management', 
          subMenu: null
        },
      ];


  return (
    <div className='h-full overflow-y-auto bg-white border-r-2 border-primary-600'>
      <div className='m-2 p-4'>
        {/* logo */}
        <h2 className='text-center'>DAUR</h2>
      </div>
      <hr className='border-primary'/>
      <div className='m-2'>
        {/* profile */}
        <Profile/>
      </div>
      <hr className='border-primary'/>
      <div>
        {/* Side Menu */}
        <SideMenu menus={listMenu}/>
      </div>
    </div>
  )
}

export default index
