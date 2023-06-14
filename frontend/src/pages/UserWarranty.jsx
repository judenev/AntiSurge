import React from 'react'

import { Box } from '@mui/system'
import UserHome from './UserHome'

import WarrantyCheck from '../Components/admin/mainpage/WarrantyCheck'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserAuth } from '../redux/features/userAuthSlice';




function UserWarranty() {
    const navigate = useNavigate();  
    const token = useSelector(selectUserAuth);
    React.useEffect(() => {
        if (!token.token.token) {
          navigate('/');
        }
      }, [token.token.token, navigate]);
    
      if (!token.token.token) {
        return null; // or render a loading state if needed
      }
    return (
        <Box sx={{ display: 'flex' }}>
            <UserHome />
            <Box component="main" sx={{ flexGrow: 1, p: 10, pl: 0 }}>

                <WarrantyCheck/>
            </Box>
        </Box>
    )
}

export default UserWarranty