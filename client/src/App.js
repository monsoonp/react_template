import React, { Component } from 'react';
import './App.css';
//import Test from 'pages/Test';
import AddingForm from 'components/AddingForm';
/*
var mysql = require('mysql');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'tester',
  password : '1234',
  port     : 3306,
  database : 'example'
});
*/
class App extends Component {
  state = {
    mytable : [],
    data:""
  }

  componentDidMount(){
    //this.getMytable();
    this.callApi()
      .then(res => this.setState({mytable: res})) //setState
      .catch(err => console.log(err));
    this.callDate()
      .then(res => this.setState({date: res})) //setState
      .catch(err => console.log(err));
  }
  callApi = async() =>{
    const response = await fetch('/api/list');
    const body = await response.json();
    return body;
  }
  callDate = async() =>{
    const response = await fetch('/api/date');
    const body = await response.json();
    return body;
  }
  /*
  getMytable = () => {
    fetch('http://localhost:3001').then((response) => response.json())// response.json()
    .then( (responseData) => this.setState({mytable: responseData}))
    .catch(error => console.log("Error fetching : %s",error));
  }
  
  showTable = (table) =>{
    return(
    <div key = {table.id}>{table.username} ({table.email})</div>
  )}
  */
  render(){
    const {mytable} = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          {/*mytable.map(tab => <showTable table={tab}/>)*/}
          {mytable && mytable.map(t => {
              return(
                
                <div key={t.id}><img src={t.image} style={{width:100, height:50}} alt={t.username}/>{t.username}({t.email})</div>
              );
          })}
          <AddingForm/>

          {/*<Test />*/}
          {/*{date && date[0].now}*/}
          
        </header>
      </div>
    );

  }
}

export default App;
