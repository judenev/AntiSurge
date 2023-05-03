import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { adminAuthReducer, deleteAdminToken } from '../redux/features/adminAuthSlice';
import { selectAdminAuth } from '../redux/features/adminAuthSlice';
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import Services from '../Components/admin/mainpage/Services';
import { useNavigate } from 'react-router-dom';
import Employee from '../Components/admin/mainpage/Employee';
import Ongoingjobs from '../Components/admin/mainpage/Ongoingjobs';
import EastIcon from '@mui/icons-material/East';

import CircleIcon from '@mui/icons-material/Circle';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminHome() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(selectAdminAuth)

  // console.log("token is ",token);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState([false, false, false]);
  const [open2, setOpen2] = React.useState(false);
  const [text, setText] = React.useState('')
  const [textup, setTextup] = React.useState('')
  const [rend, setRend] = React.useState('')
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let logout = () => {
    dispatch(deleteAdminToken())
    navigate('/admin')

  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Anti-Surge Administration Panel
          </Typography>

        </Toolbar>

      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Job Status', 'Employees'].map((text, index) => (
            <>
              <ListItemButton onClick={() => {

                setOpen2(!open2)
                let open_array = open1
                open_array[index] = !open_array[index]
                setOpen1(open_array)
                console.log(' ')
                console.log('clicked', open1, open_array)
              }}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
                {open1[index] ? <CircleIcon/> : <ExpandLess />}
              </ListItemButton>

              <Collapse in={open1[index]}>
                <List component="div" disablePadding>
                  {[[], ['On-Going jobs', 'non-Allocated jobs', 'All Jobs'], ['Add Employee','Show Employee']][index].map((text, index1) => (
                    <ListItemButton sx={{ pl: 4 }} onClick={() => {
                      setText(text);
                      if (text == 'On-Going jobs') {
                        navigate('/ongoingjob')
                      } else if (text == 'non-Allocated jobs') {
                        navigate('/nonallocated')
                      }else if(text =='Add Employee'){
                        navigate('/addemp')
                      }
                      else if(text =='Show Employee'){
                        navigate('/showemp')
                      }
                      else{
                        navigate('/alljob')
                      }




                    }}>
                      <ListItemIcon>
                       
                       <EastIcon/>
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

            </>
          ))}


        </List>
        <Divider />
        <List>
          {['Leave Approval','Adding Services', 'Warranty Check'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => {
                setTextup(text)
                setRend(text)
                if (text == 'Adding Services') {
                  navigate('/services')
                }else if(text=='Leave Approval'){
                    navigate('/empleavelist')
                }else{

                }
              }} >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />

              </ListItemButton>

            </ListItem>
          ))}
        </List>

        <ListItemButton onClick={logout}> <ListItemText primary='Logout' /> </ListItemButton>

      </Drawer>
      <Main open={open} >
        
        {

        }
      </Main>
    </Box>
  );
}