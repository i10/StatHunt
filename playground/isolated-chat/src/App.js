import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { steps } from './chat_options';


function App() {
  const chat_config = {
    floating: false,
    opened: true,
    width: '40vw',
    hideUserAvatar: true,
    hideBotAvatar: true,
    botDelay: 10,
    headerTitle: 'StatHunt',
    style: {
      'margin-left': '30vw',
      'margin-top': '10vh'
    },
    // contentStyle: {
    //   height: '100px'
    // }
  }

  return (
    <div>
      <ChatBot steps={steps} {...chat_config}/>
    </div>
  );
}

export default App;
