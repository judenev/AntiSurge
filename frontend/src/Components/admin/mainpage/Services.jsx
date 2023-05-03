import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'grey' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Services() {
  const navigate = useNavigate()
  return (
  
      <Box sx={{ width: '100%' }}>
      <h1 >Avialable Services</h1>
      <Stack spacing={4} >
          <Tooltip title="Click here" arrow>
          <Item onClick={()=>{
         navigate("/services/minorcheck");
        }}>Minor</Item>
          </Tooltip>
          <Tooltip title="Click here" arrow>
        <Item onClick={()=>{
          navigate("/services/normalcheck");
        }}> Normal</Item>
        </Tooltip>
        <Tooltip title="Click here" arrow>
        <Item onClick={()=>{
         navigate("/services/majorcheck");
        }}>Major Check</Item>
            </Tooltip>
      </Stack>
    </Box>
  
    
  )
}