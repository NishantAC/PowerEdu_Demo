import React from 'react'
import './Spinner.css'

const Spinner = ({width, borderRightColor}) => {
  return (
    <div className='loader'
          style={{width: width, 
               borderRightColor: borderRightColor
          }}
    ></div>
  )
}

export default Spinner