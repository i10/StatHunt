import React, { Component } from 'react';

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

export default class ChatWindow extends Component {
    constructor(props) {
        super(props);
        var steps = [
            {
                "id": "0",
                "message": "Hello, welcome to StatHunt! I’m here to help you find a correct statistical procedure for your experiment.",
                "trigger": "1"
            },
            {
                "id": "1",
                "message": " If you’re unsure how to respond, just send me a 'not sure' or ‘help’.",
                "trigger": "2"
            },
            {
                "id": "2",
                "message": "What’s the name of the experiment you need help with?",
                "trigger": "designName"
            },
            {
                "id": "designName",
                "user": true,
                validator: (value) => {
                    this.props.updateWorkspaceXml("designName", value);
                    return true;
                },
                "trigger": "4"
            },
            {
                "id": "4",
                "message": "What are you trying to achieve with the experiment?",
                "trigger": "5"
            },
            {
                "id": "5",
                "user": true,
                validator: (value) => {
                    this.props.updateWorkspaceXml("goal", value);
                    return true;
                },
                "trigger": "6"
            },
            {
                "id": "6",
                "message": "What is the research hypothesis?",
                "trigger": "7"
            },
            {
                "id": "7",
                "message": " A hypothesis is a sentence that states a relationship between two or more variables. E.g., “Users who use system A performed the task faster than users who use system B.”",
                "trigger": "8"
            },
            {
                "id": "8",
                "user": true,
                validator: (value) => {
                    this.props.updateWorkspaceXml("hypothesis", value);
                    return true;
                },
                "trigger": "9"
            },
            {
                "id": "9",
                "message": "Could you briefly explain the procedure of your experiment?",
                "trigger": "procedure"
            },
            {
                "id": "procedure",
                "user": true,
                validator: (value) => {
                    this.props.updateWorkspaceXml("procedure", value);
                    return true;
                },
                "trigger": "10"
            },
            {
                "id": "10",
                "message": "OK, let’s get to the experimental design. Will you be using a between-subjects or within-subjects design?",
                "trigger": "11"
            },
            {
                "id": "11",
                "user": true,
                "trigger": "12"
            },
            {
                "id": "12",
                "message": "A between-subjects study design would mean that each user group uses only one condition of the independent variable, whereas a within-subjects study design would mean that every user group uses all conditions.",
                "trigger": "13"
            },
            {
                "id": "13",
                "user": true,
                validator: (value) => {
                    if (value[0] === 'b') {
                        this.props.updateWorkspaceXml("BETWEENWITHIN", "between");
                    }
                    else if (value[0] === 'w') {
                        this.props.updateWorkspaceXml("BETWEENWITHIN", "within");
                    } else {
                        this.props.updateWorkspaceXml("BETWEENWITHIN", "unknown")
                    }
                    return true;
                },
                "trigger": "14"
            },
            {
                "id": "14",
                "message": "How many participants are going to take part in your experiment?",
                "trigger": "participants"
            },
            {
                "id": "participants",
                "user": true,
                validator: (value) => {
                    this.props.updateWorkspaceXml("participants", value);
                    return true;
                },
                "trigger": "15",
                // "end": true
            },
            {
                "id": "15",
                "message": "Now let's get to the experiment variables.",
                "trigger": "16"
            },
            {
                "id": "16",
                "message": "What's the name of your independent variable?",
                "trigger": "independent_variables"
            },
            {
                "id": "independent_variables",
                "user": true,
                validator: (value) => {
                    this.props.updateWorkspaceXml("independent_variables", value);
                    return true;
                },
                "trigger": "18"
            },
            {
                "id": "18",
                "message": "What are the different values '{previousValue}' can take?",
                "trigger": "19"
            },
            {
                "id": "19",
                "message": "Please send them over in a comma separated format. e.g. 'red, blue, purple'",
                "trigger": "iv_values"
            },
            {
                "id": "iv_values",
                "user": true,
                validator: (value) => {
                    var values = value.split(',');
                    for (var i in values) {
                        this.props.updateWorkspaceXml("iv_values", values[i]);
                    }
                    return true
                },
                "trigger": "20",
            },
            {
                "id": "20",
                "message": "What's the name of your dependant variable?",
                "trigger": "dependent_variables",
            },
            {
                "id": "dependent_variables",
                "user": true,
                validator: (value) => {
                    this.props.updateWorkspaceXml("dependent_variables", value);
                    return true;
                },
                "end": true
            },
        ]

        this.state = {
            steps: steps
        }
    }

    render() {
        const config = {
            width: "40%",
            height: "83%",
            contentStyle: {
                height: '82%'
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

// var input = "Hello, welcome to StatHunt! I’m here to help you find a correct statistical procedure for your experiment./ If you’re unsure how to respond, just send me a 'not sure' or ‘help’./What’s the name of the experiment you need help with?&What are you trying to achieve with the experiment?&What is the research hypothesis?/ A hypothesis is a sentence that states a relationship between two or more variables. E.g., “Users who use system A performed the task faster than users who use system B.”&OK, let’s get to the experimental design. Will you be using a between-subjects or within-subjects design?&A between-subjects study design would mean that each user group uses only one condition of the independent variable, whereas a within-subjects study design would mean that every user group uses all conditions.&"
// var l = 0;
// var steps = [];
// var step = 0;
// for (var r = 0; r < input.length; r++) {
//     if (input[r] === '&' || input[r] === '/') {
//         steps[step] = { id: String(step), message: input.slice(l, r), trigger: String(step + 1) };
//         l = r + 1;
//         step++;
//         if (input[r] === '&') {
//             steps[step] = { id: String(step), user: true, trigger: (r + 1 === input.length) ? String(step) : String(step + 1) };
//             step++;
//         }
//     }
// }
// console.log(steps);