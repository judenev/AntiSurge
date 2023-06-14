import React from 'react';
import EmpHome from '../admin/mainpage/EmpHome';
import { Box } from '@mui/material';
import EmployeeAlljobs from '../admin/mainpage/EmployeeAlljobs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmpAuth } from '../../redux/features/employeeAuthSlice';

function EmpAlljobs() {
  const navigate = useNavigate();
  const token = useSelector(selectEmpAuth);

  React.useEffect(() => {
    if (!token.token.token) {
      navigate('/employee');
    }
  }, [token.token.token, navigate]);

  if (!token.token.token) {
    return null; // or render a loading state if needed
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <EmpHome />
      <Box component="main" sx={{ flexGrow: 1, p: 10, pl: 0 }}>
        <EmployeeAlljobs />
      </Box>
    </Box>
  );
}

export default EmpAlljobs;
