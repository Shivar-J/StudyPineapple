import React from 'react';

export default class Classpage extends React.Component {
    state = {
        classId: '',
        subject: [],
        description: [],
        date: [],
        data: [],
    }
    async componentDidMount(){
        let url = window.location.href;
        const split = url.split('http://localhost:3000/classpage/?');
        console.log(split[1]);
        this.setState({ classId: split[1] });

        await fetch('http://localhost:8000/getPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: this.state.classId
        })
        .then(data => {
            this.setState({ data: data });
            data.forEach(element => {
                this.state.subject.push(element.subject);
                this.state.description.push(element.description);
                this.state.date.push(element.data);
            });
        })
    }

    display() {
        let divs = [];
        let descDivs = [];
        let dateDivs = [];
        for(let i = 0; i < this.state.data.length; i++) {
            divs.push(<div key={i}>{this.state.data[i].subject}</div>);
            descDivs.push(<div key={i}>{this.state.data[i].description}</div>);
            dateDivs.push(<div key={i}>{this.state.data[i].date}</div>);
        }
        return divs, descDivs, dateDivs;
    }

    render() {
        return (
            <div>
                {this.display()}
            </div>
        );
    }
}