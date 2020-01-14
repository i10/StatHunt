import React, {Component} from 'react';
import { Card, 
    CardHeader, 
    CardContent, 
    CardActions, 
    TextField, 
    ListItem, 
    ListItemText, 
    Typography, 
    List} 
    from '@material-ui/core';



export default class ChatWindow extends Component{
    render(){
        return(
            <Card>
                <CardHeader>
                    Hello
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardActions>
                    <form autoComplete="off">
                        <TextField id="standard-basic"></TextField>
                    </form>
                </CardActions>
            </Card>
        );
    }
}