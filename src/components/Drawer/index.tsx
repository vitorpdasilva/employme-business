import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import WorkIcon from '@mui/icons-material/Work'
import { Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, styled } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { ReactNode, useState } from 'react'

type MenuItems = {
  name: string
  icon: ReactNode
  path: string
}
const menuItems: MenuItems[] = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { name: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
  { name: 'Candidates', icon: <PeopleIcon />, path: '/candidates' },
  { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
]

const drawerWidth = 240

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<{ open: boolean }>(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
)

export const DrawerNav = (): JSX.Element => {
  const [open, setOpen] = useState(true)

  const toggleDrawer = (): void => {
    setOpen(!open)
  }

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {menuItems.map((item) => {
          return (
            <ListItemButton key={item.name} component="a" href={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          )
        })}
      </List>
    </Drawer>
  )
}
