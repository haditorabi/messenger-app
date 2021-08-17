import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
}));

const Messages = (props) => {
  const classes = useStyles();
  const { messages, otherUser, userId, lastRead } = props;
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return (
          <Box key={message.id} className={classes.root}>
            {message.senderId === userId ? (
                <SenderBubble
                  text={message.text}
                  time={time}
                  otherUser={otherUser}
                  lastRead={lastRead}
                  messageId={message.id}
                />
                ) : (
                  <OtherUserBubble
                  text={message.text}
                  time={time}
                  otherUser={otherUser}
                  />
                  )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Messages;
