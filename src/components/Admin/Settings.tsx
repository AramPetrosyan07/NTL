import React from 'react'
import AsideMenu from './AsideMenu'
import { Outlet } from 'react-router-dom'

const Settings = () => {
  return (
    <div className='w-full h-screen  flex'>
     <AsideMenu/>
     <div className='content px-2 py-6 w-full overflow-y-auto'>
         <Outlet/>
     </div>
    </div>
  )
}

export default Settings
