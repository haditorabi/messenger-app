import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: "10%",
    },
    background: {
        backgroundColor: " #3A8DFF",
        borderRadius: "50%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        width: "30px",
    },
    text: {
        color: "white",
        fontSize: 12,
        fontFamily: "open-sans",
        fontWeight: "bolder",
    },
}));

const UnreadMsgCount = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.background}>
                <Typography className={classes.text}>{props.value}</Typography>
            </div>
        </div>
    );
};

export default UnreadMsgCount;
