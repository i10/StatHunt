import React, { Component } from 'react';

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

export default class ChatWindow extends Component {
    constructor(props) {
        super(props);
        var input = "Hello, welcome to StatHunt! I’m here to help you find a correct statistical procedure for your experiment./ If you’re unsure how to respond, just send me a 'not sure' or ‘help’./What’s the name of the experiment you need help with?&What are you trying to achieve with the experiment?&What is the research hypothesis?/ A hypothesis is a sentence that states a relationship between two or more variables. E.g., “Users who use system A performed the task faster than users who use system B.”&OK, let’s get to the experimental design. Will you be using a between-subjects or within-subjects design?&A between-subjects study design would mean that each user group uses only one condition of the independent variable, whereas a within-subjects study design would mean that every user group uses all conditions.&"
        var l = 0;
        var steps = [];
        var step = 0;
        for (var r = 0; r < input.length; r++) {
            if (input[r] === '&' || input[r] === '/') {
                steps[step] = { id: String(step), message: input.slice(l, r), trigger: String(step + 1) };
                l = r + 1;
                step++;
                if (input[r] === '&') {
                    steps[step] = { id: String(step), user: true, trigger: (r + 1 === input.length) ? String(step) : String(step + 1) };
                    step++;
                }
            }
        }

        this.state = {
            steps: steps
        }
    }

    render() {
        const config = {
            width: "40%",
            height: "80%",
            contentStyle: {
                height: '80%'
            },
            floating: true,
            hideBotAvatar: true,
            hideUserAvatar: true,
            opened: true,
            headerTitle: "Chatbot",
        }
        const theme = {
            background: '#f5f8fb',
            fontFamily: 'Roboto',
            headerBgColor: '#5A6D7D',
            headerFontColor: '#fff',
            headerFontSize: '15px',
            botBubbleColor: '#5A6D7D',
            botFontColor: '#fff',
            userBubbleColor: '#88A5BD',
            userFontColor: '#fff',
        }
        return (
            <ThemeProvider theme={theme}>
                <ChatBot steps={this.state.steps} {...config} />
            </ThemeProvider>
        )
    }
}