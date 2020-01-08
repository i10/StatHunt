import React, {Component} from 'react';
import { TextField, CardHeader, Card, CardContent, CardActions} from '@material-ui/core';

class ChatBox extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return(
            <Card>
                <CardHeader>Hunter</CardHeader>
                <CardContent></CardContent>
                <CardActions>
                        <form noValidate autoComplete="off">
                            <TextField id="outlined-basic" variant="outlined"/>
                        </form>
                </CardActions>
            </Card>
        )
    }
}

export default ChatBox;