

import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeProperties } from '@/slices/theme';




const Search = styled('div')(({ theme }) => ({
     position: 'relative',
     borderRadius: '20px',
     backgroundColor: theme.properties?.inputBackground || alpha(theme.palette.common.white, 0.15),
     '&:hover': {
       backgroundColor: alpha(theme.palette.common.white, 0.25),
     },
     marginLeft: 0,
     width: '100%',
     [theme.breakpoints.up('sm')]: {
       marginLeft: theme.spacing(1),
       width: 'auto',
     },
     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
     transition: 'box-shadow 0.3s ease-in-out',
   }));
   const SearchIconWrapper = styled('div')(({ theme }) => ({
     height: '100%',
     position: 'absolute',
     pointerEvents: 'none',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     paddingLeft: theme.spacing(2),
   }));
   
   const StyledInputBase = styled(InputBase)(({ theme }) => ({
     color: 'inherit',
     width: '100%',
     '& .MuiInputBase-input': {
       padding: theme.spacing(1, 1, 1, 0),
       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
       transition: theme.transitions.create('width'),
       width: '100%',
       [theme.breakpoints.up('sm')]: {
         width: '30ch',
         '&:focus': {
           width: '40ch',
         },
       },
     },
   }));
   

const SearchBarComponent = ({ searchString, setSearchString, handleChange, placeholder = "Search.." }) => {
     const themeProperties =  useSelector(selectThemeProperties);

     

     return (
          <>
          
          <Box sx={{  padding: "10px", zIndex: "100"}}>
            <Toolbar>
              <Search
                style={{
                  background: themeProperties.inputBackground,
                  color: themeProperties.inputTextColor,
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon style={{
                    color: themeProperties.inputTextColor,
                   }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={placeholder}
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchString}
                  onChange={handleChange}
                  style={{
                    color: themeProperties.inputTextColor,
                    borderRadius: '20px',
                  }}
                />
              </Search>
            </Toolbar>
          </Box>

          
          </>
);}
export default SearchBarComponent;