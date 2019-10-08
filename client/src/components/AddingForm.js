import React from 'react'

import { post } from 'axios';



class AddingForm extends React.Component {

    state = {
        file: null,
        username: '',
        email:'',
        fileName: ''
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer().then((response) => {
            console.log(response.data);
        })
        this.setState({
            file: null,
            username:"",
            email:"",
            fileName:""
        });
        window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    handleValueChange = (e) => {
        //let nextState = {};
        //nextState[e.target.name] = e.target.value;
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    addCustomer = () => {
        const url = '/api/list';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('name', this.state.username)
        formData.append('email', this.state.email)
        const config = {
            headers: {
            'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)

    }

    render() {

        return (

        <form onSubmit={this.handleFormSubmit}>

            <h3>TABLE 추가</h3>
            프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
            이름: <input type="text" name="username" value={this.state.userName} onChange={this.handleValueChange} /><br/>
            E-mail: <input type="text" name="email" value={this.state.email} onChange={this.handleValueChange} /><br/>
            
            <button type="submit">추가하기</button>
        </form>

        )
    }
}

export default AddingForm;

