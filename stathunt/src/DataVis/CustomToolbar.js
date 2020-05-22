import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

class CustomToolbar extends React.Component {
  
  handleClick = () => {
    console.log("clicked on icon!");
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"custom icon"}>
          <IconButton onClick={this.handleClick}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default (CustomToolbar);
