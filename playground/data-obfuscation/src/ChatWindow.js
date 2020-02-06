import React from 'react';
import ChatBot from 'react-simple-chatbot';

export default function ChatWindow() {
    const steps = [
        {
            id: '0',
            message: 'Data visualisation scenario',
            end: true
        }
    ]
    const style = {
        width: '30vw',
        height: '80vh'
    }
    
    return <ChatBot steps={steps} floating={true} style={style}/>
}
