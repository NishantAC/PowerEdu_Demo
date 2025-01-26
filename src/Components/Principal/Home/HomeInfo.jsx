import CircularsList from '@/Components/Admin/Home/CircularsList'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectThemeProperties } from '@/slices/theme'


const HomeInfo = () => {
     const themeProperties = useSelector(selectThemeProperties);
  return (
     <div
     className="flex gap-2 p-2 rounded-[20px] max-lg:flex-col h-full overflow-hidden"
     style={{
       color: themeProperties.textColor,

     }}
   >
     {/* */}
     <div className="relative flex flex-col rounded-[20px] w-full h-full"
       style={{
         background: themeProperties?.boxBackgroundSolid,
       }}
     ></div>

     {/* Circulars List Box */}
     <CircularsList/>
   </div>
  )
}

export default HomeInfo