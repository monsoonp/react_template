import React, {useState, useEffect} from 'react';
import {TreeView,TreeItem} from '@material-ui/lab';
import { Route, Switch } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink } from 'react-router-dom';
import StreetList from 'pages/address/StreetList';

const DongList = (props) =>{
    const sigungu = props.match.params.sigungu;
    const [dongList, setDongList]=useState([]);
    const [dong, setDong]=useState("");
    const getDong = async() =>{
        const response = await fetch(`/address/${sigungu}`);
        const body = await response.json();
        return body;
    }
      
    useEffect(()=>{
        if(sigungu !== ""){
            getDong()
                .then(res => setDongList(res)) //setState
                .catch(err => console.log(err));
            //console.log(dongList);
        }
        
        return()=>{

        }
    },[sigungu])
    return (
        <div>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {dongList.map( (adr, i) => {
                    return(
                        <NavLink key={i} to={`/address/${sigungu}/${adr.dong}`}>
                            <TreeItem nodeId={adr.sigungu+adr.id} label={adr.dong}>
                                <Route path={`/address/:sigungu/:dong`}>
                                    <StreetList sigungu={sigungu} dong={adr.dong}/>
                                </Route>
                            </TreeItem>
                        </NavLink>
                    )
                })}
            </TreeView>
        </div>
    );
}
export default DongList;