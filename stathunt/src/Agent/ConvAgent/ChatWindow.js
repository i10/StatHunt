import React, {Component} from 'react';

import ChatBot from 'react-simple-chatbot';

export default class ChatWindow extends Component{
    constructor(props){
        super(props);
        var input = "Hello, welcome to StatHunt! I’m here to help you find a correct statistical procedure for your experiment./ If you’re unsure how to respond, just send me a ‘not sure’ or ‘help’./What’s the name of the experiment you need help with?&What are you trying to achieve with the experiment?&What is the research hypothesis?/ A hypothesis is a sentence that states a relationship between two or more variables. E.g., “Users who use system A performed the task faster than users who use system B.”&OK, let’s get to the experimental design. Will you be using a between-subjects or within-subjects design?&A between-subjects study design would mean that each user group uses only one condition of the independent variable, whereas a within-subjects study design would mean that every user group uses all conditions.&"
        var l = 0;
        var steps = [];
        var step = 0;
        for (var r = 0; r < input.length; r++){
            if(input[r] === '&' || input[r] ==='/'){
                steps[step] = {id: String(step), message: input.slice(l, r), trigger: String(step+1)};
                l = r+1;
                step++;
                if(input[r] === '&'){
                    steps[step] = {id: String(step), user: true, trigger: (r +1 === input.length) ? String(step) : String(step+1)};
                    step++;
                }
            }
        }

        this.state = {
            steps: steps
        }
    }

    render(){
        return(
            <ChatBot style={{width:'32%'}} floating={true} hideBotAvatar = {true} hideUserAvatar = {true}  steps = {this.state.steps} />
        )
    }
}