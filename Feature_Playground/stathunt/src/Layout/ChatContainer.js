import React, {Component} from 'react';
import ChatWindow from '../Agent/ConvAgent/ChatWindow';
import ChatBot from 'react-simple-chatbot';

const steps = [
    {
      id: '0',
      message: 'Welcome to react chatbot!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Bye!',
      trigger: '3',
    },
    {id:'3',
        user: true,
    end: true}
  ];

export default class ChatContainer extends Component{
    render(){
        return <ChatBot steps={steps}/>
    }
}