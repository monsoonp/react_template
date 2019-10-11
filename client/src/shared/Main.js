import React, {useState, useEffect} from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, withStyles,   } from '@material-ui/core/styles';
import {CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, Badge, Container, Grid, Link} from '@material-ui/core/';
//import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import MainListItems from 'components/MainListItems';
import Address from 'components/Address';
//import Test from 'pages/Test';
//import Chart from './Chart';
//import Deposits from './Deposits';
//import Orders from './Orders';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const styles  = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
});
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Main() {
    
    const classes = useStyles();
    //const {classes} = props;
    const [open, setOpen] = useState(true);
    const [demo, setDemo] = useState("");
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    const check = (val) => {
        setDemo(val);
    }
    
    useEffect(()=>{
        
    },[])

    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/*좌측 nav bar*/}
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            {/*상단 tool bar*/}
            <Toolbar className={classes.toolbar}>
                {/*button*/}
                <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                {/*title*/}
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Demo page
                </Typography>
                {/*badge button*/}
                <NavLink exact to="/">
                  <IconButton color="inherit">
                    <Badge badgeContent={2} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </NavLink>
            </Toolbar>
            </AppBar>
            
            <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
            >
              <div className={classes.toolbarIcon}>
                  <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                  </IconButton>
              </div>
              {/*main list*/}
              <Divider />
              <List><MainListItems check={check}/></List>
              {/*sub list*/}
              <Divider />
            
            </Drawer>

            {/* main contents */}
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                  
                      {/*<Route path={`/address/:name`} component={Test}/> */}
                      <Route path="/address" component={Address}/>
                        
                    
                    
                    {/*
                    <Route exact path="/" component={Home}/>   exact 컴포넌트 주소 구분 
                    <Switch>
                        <Route path="/about/:name" component={About}/>  Switch 비교할 라우트를 위에, 매칭되는 첫번째 라우트
                        <Route path="/about" component={About}/>
                    </Switch>
                    <Route path="/posts" component={Posts}/>
                    */}
                  </Grid>
                </Grid>
              </Container>
              <Copyright />
            </main>
        </div>
    );
}

export default withStyles(styles)(Main);