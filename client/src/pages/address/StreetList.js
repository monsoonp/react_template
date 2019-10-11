import React, {useState, useEffect} from 'react';
import {TreeView,TreeItem} from '@material-ui/lab';
import { Route, Switch, NavLink } from 'react-router-dom';
//import { Route, Switch } from 'react-router-dom';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import ChevronRightIcon from '@material-ui/icons/ChevronRight';


function StreetList(props){
    const [streetList, setStreetList]=useState([]);
    //const [dong, setDong]=useState("");
    const getStreet = async() =>{
        const response = await fetch(`/address/${props.sigungu}/${props.dong}`);
        const body = await response.json();
        return body;
    }
      
    useEffect(()=>{
        if(props.dong !== ""){
            getStreet()
                .then(res => setStreetList(res)) //setState
                .catch(err => console.log(err));
        }
        return()=>{

        }
    },[props.dong])
    return (
        <div>
            
            
            {streetList.map( (adr, i) => {
                return(
                    <NavLink to={`/address/${props.sigungu}/${props.dong}/${adr.street}`}>
                        <TreeItem key={adr.id} nodeId={adr.sigungu+adr.id} label={adr.street}>
                        </TreeItem>
                    </NavLink>
                
                )
            })}
            
           
        </div>
    );
}
export default StreetList;