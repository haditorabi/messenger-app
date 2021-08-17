import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UnreadMsgCount from "./UnreadMsgCount";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewTextUnread: {
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: -0.17,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            conversation.unReadMsgsCount === 0
              ? classes.previewText
              : classes.previewTextUnread
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      {conversation.unReadMsgsCount > 0 && (
        <UnreadMsgCount value={conversation.unReadMsgsCount} />
      )}
    </Box>
  );
};

export default ChatContent;
