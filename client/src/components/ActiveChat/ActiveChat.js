import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { readMsgs } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, activeConv } = props;
  const conversation = props.conversation;
  const [currentConv, setCurrentConv] = useState(null);
  useEffect(() => {
    if (conversation && activeConv?.id === currentConv?.id) {
      props.readMessages(conversation);
    }
  }, [activeConv, currentConv, conversation, props]);
  
  useEffect(() => {
    setCurrentConv(activeConv);
  }, [activeConv, currentConv]);

  return (
    <Box className={classes.root}>
      {conversation?.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeConv: state.activeConv,
    conversation:
      state.conversations?.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      ) ?? {},
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      readMessages: (senderId) => {
          dispatch(readMsgs(senderId));
      },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
