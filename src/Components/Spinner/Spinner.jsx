import React from 'react'
import './Spinner.css'
import { selectThemeProperties } from '@/slices/theme'
import { useSelector } from 'react-redux'
const Spinner = ({}) => {
  const themeProperties = useSelector(selectThemeProperties)
  return (
    <div className='loader'
    >

        <style>
          {`
            .loader {
                color: ${themeProperties?.normal3};
                }
              .loader:after {
                color: ${themeProperties?.specialColor}; 
              }
          

          `}
        </style>

    </div>
  )
}

export default Spinner