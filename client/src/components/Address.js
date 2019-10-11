import React, {useState, useEffect} from 'react';
import { NavLink, Route } from 'react-router-dom';
//import SidoTree from './list/SidoTree';
//import AddressList from './list/AddressList';
//import logo from './logo.svg';
//import './App.css';
//import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
//import { TreeView, TreeItem} from '@material-ui/lab';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import DongList from 'pages/address/DongList';
import TableList from 'pages/address/TableList';
//import { CsvToHtmlTable } from 'react-csv-to-table';

const styles  = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
const addressList = {
  width: '90%',
  margin: 'auto'
}
const Address=(props)=> {
  const {classes} = props;
  const activeStyle = {
    color: 'green',
    fontSize: '2rem'
  }
  const rowStyle={
    minHeight: '50vh' 
  }

  const [sigunguList,setSigunguList] = useState([]);
  const [sigungu, setSigungu] = useState("");
  
  const getSigungu = async() =>{
    const response = await fetch('/address');
    const body = await response.json();
    return body;
  }
  const getDong = async() =>{
    const response = await fetch('/address/sigungu');
    const body = await response.json();
    return body;
  }
  
  const checkSigungu = (e) => {
    setSigungu(e.target.name);
    //console.log(props.match.url);
  }
  useEffect(()=>{
    if(sigungu===""){
      getSigungu()
          .then(res => setSigunguList(res)) //setState
          .catch(err => console.log(err));
    }
    return()=>{
      console.log("address unmount");
    }
  },[]);
  
  return(
    <div>
        
      <div className={classes.root}>
          {/* 
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                서울특별시 종로구, 중랑구 도로명 주소 정보
              </Paper>
            </Grid>
          </Grid>
          */}
          <div>
            <Grid container spacing={1} justify="flex-start" alignItems="center">
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                    {/* 시군구 선택 */}
                    {sigunguList.map(val => {
                      return(
                        <NavLink key={val.id} to={`${props.match.url}/${val.sigungu}`}>
                          <Button variant="primary" name={val.sigungu} onClick={checkSigungu}>{val.sigungu}</Button>
                        </NavLink>
                      );
                    })}
                    
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <h2><b>서울특별시 도로명 주소 정보</b></h2>
                  </Paper>
                </Grid>
                <Grid item xs={1}>
                  <Paper className={classes.paper}>
                    <NavLink exact to="/">
                      <Button variant="info">exit</Button>
                    </NavLink>
                  </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={0} justify="center" alignItems="stretch" direction="row">
              <Grid item xs={2}>
                <Paper className={classes.paper}style={rowStyle}>
                  {/* 동 리스트 */}
                  <Route path={`${props.match.url}/:sigungu`} component={DongList}/>
                    
                  
                </Paper>
              </Grid>
              <Grid item xs={10}>
                <Paper className={classes.paper}style={rowStyle}>
                  {/* main content */}
                                    
                  <div style={addressList}>
                  <Route path={`${props.match.url}/:sigungu/:dong/:street`} component={TableList}/>
                                    
                  {/*<AddressList gungu={this.state.gungu} list={this.state.addr.filter((val, i) => this.state.gungu === val.sigun && val.street === this.state.street)}/>*/}
                  {/*"sido","sigun","dong","구주소본번","구주소부번","street","새주소본번","새주소부번","건물명","상세건물명","X좌표","Y좌표"*/}
                    
                  </div>
                </Paper>
              </Grid>
              
            </Grid>
          </div>
        </div>

        <div>
          
        </div>
      </div>  //main div
  );
}
export default withStyles(styles)(Address);