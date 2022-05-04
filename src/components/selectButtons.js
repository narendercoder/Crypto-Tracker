import { makeStyles } from '@material-ui/core';
import React from 'react'

const SelectButtons = ({children, selected, onClick}) => {
    const useStyles = makeStyles({
        selectbuttons:{
            display: "flex",
            justifyContent:"center",
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? " gold" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "gold",
                color:"black",
            },
            width: "15%",
        }
    });
    const classes = useStyles();
  return (
    <span onClick={onClick}
    className={classes.selectbuttons}>{children}</span>
  )
}

export default SelectButtons;