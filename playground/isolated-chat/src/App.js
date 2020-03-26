import React from 'react';
import ChatBot from 'react-simple-chatbot';


function App() {
  var steps = [
    {
      id: '1',
      message: 'Hello You!',
      trigger: '2'
    },
    {
      id: '2',
      user: true,
      placeholder: 'Your Mom!',
      trigger: '1'
    }
  ];

  const chat_config = {
    floating: true,
    opened: true,
    width: '40%',
    height: '80%',
    hideUserAvatar: true,
    hideBotAvatar: true,
    botDelay: 0,
    headerTitle: 'StatHunt'
  }

  return (
    <div>
      <ChatBot steps={steps} {...chat_config}/>
    </div>
  );
}

export default App;
