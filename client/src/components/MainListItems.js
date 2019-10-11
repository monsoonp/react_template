import React, {useEffect} from 'react';
import {ListItem, ListItemIcon, ListItemText, ListSubheader}  from '@material-ui/core/';
import ListIcon from '@material-ui/icons/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
//import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';

const MainListItems=(props)=> {
  const activeStyle = {
    color: 'green',
    fontSize: '2rem'
  }
  
  const check = (e) => {
    props.check(e.target.name);
  }
  useEffect(()=>{
    
    return()=>{

    }
  },[])

  return(
    <div>
      <ListSubheader inset>Demo List</ListSubheader>
      <NavLink exact to="/address">
        <ListItem button name="address" onClick={check}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="서울시 도로명 주소" />
        </ListItem>
      </NavLink>

      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
      
    </div>
  );
}
export default MainListItems;
/*
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
*/