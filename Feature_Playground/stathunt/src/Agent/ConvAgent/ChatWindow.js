import React, {Component} from 'react';
import { makeStyles } from '@material-ui/styles';

import ChatBot from 'react-simple-chatbot';

export default class ChatWindow extends Component{
    constructor(props){
        super(props);
        this.state = {
            steps: [
                {
                    id: '0',
                    message: "Welcome to StatHunt!",
                    trigger: '1'
                },
                {
                    id: '1',
                    message: "I'm Hunter, your guide to finding a statistical analysis procedure",
                    trigger: '2'
                },
                {  
                    id: '2',
                    message: "Let's get started, what's the name of your experiment?",
                    trigger: '3'
                },
                {
                    id: '3',
                    user: true,
                    trigger: '3'
                }
            ]
        }
    }

    render(){
        return(
            <ChatBot hideBotAvatar = {true} hideUserAvatar = {true} steps = {this.state.steps} width={"35%"} floating={true} />
        )
    }
}