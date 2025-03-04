import { selectThemeProperties } from '@/slices/theme';
import { LinearProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const Loader = ({name}) => {
     const themeProperties = useSelector(selectThemeProperties);
  return (
          <div className="flex items-center justify-center h-full">
            <div
              className="text-center text-sm mt-2"
              style={{ color: themeProperties.specialColor }}
            >
              <LinearProgress color="inherit" />
              <p style={{ color: themeProperties.textColor }}>
                Loading the {name}
              </p>
            </div>
          </div>
  )
}

export default Loader