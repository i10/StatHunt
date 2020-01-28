import React, {Component} from 'react';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            hello: "Insert Stuff Here"
        }
    }

    render(){
        return <h1>{this.state.hello}</h1>
    }
}