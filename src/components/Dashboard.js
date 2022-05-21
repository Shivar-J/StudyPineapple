import React from 'react';
import '../stylesheets/index.css';
import { Navigate } from 'react-router-dom';
import { getCookieValue } from "./utility.js";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        redirect: '',
        data: []
    }
    async componentDidMount(){
        let response = await fetch("http://localhost:8000/getClasses", {
            
            headers: {
                'Content-Type' : 'application/json'
            },
            "body": {"username": getCookieValue("username")}
        }) 
        response = await response.json();

        this.setState({data: response});
    }

  
    
    display() {
        let divs = [];
        let descDivs = [];
        for(let i = 0; i < this.state.data.length; i++) {
            divs.push(<div key={i} className='box' onClick={this.handleSubmit}>{this.state.data[i].className}</div>);
            descDivs.push(<div key={i} className='box' onClick={ (event) => this.handleSubmit(event, this.state.data[i].classId)}>{this.state.data[i].classDesc}</div>);
        }
        return divs, descDivs;
    }

    

    handleSubmit = async (e, i) => {
        console.log('clicked');
        const state = { classId: i };
        const url = "/classpage/?" + i;
        this.setState({ redirect: url });
        
    }
    
    render() {
        if(this.state.redirect){
            return(
                <Navigate to={this.state.redirect}/>
            )
        }
        return (
            <div>
                {this.display()}
                
            </div>
        )
    }
}