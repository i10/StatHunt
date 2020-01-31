import React, {Component} from 'react';
import ChatWindow from '../Agent/ConvAgent/ChatWindow';


export default class ChatContainer extends Component{
    render(){
        return <ChatWindow updateWorkspaceXml={this.props.updateWorkspaceXml}/>
    }
}