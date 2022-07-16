import styled from "@emotion/styled";
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Divider, IconButton, Paper, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { FormEvent, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { WebsocketContext } from "../contexts/websocket.context";
import { sendMessage } from "../thunks";
import { ContactTypes, MessageTypes } from "../models";

const ComponentContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0 5px;
`;

const HeaderContainer = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px 10px 10px;
`;

const MessagesContainer = styled.div`
  overflow: auto;
  margin: 10px 0;
  padding: 0 5px;
  flex: 1;
`;

const MessageLine = styled.div`
  display: flex;

  &.sent {
    justify-content: flex-end;
  }
`;

const MessageBubble = styled(Paper)`
  padding: 10px;
`;

const ActionContainer = styled.form`
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 0 5px;

  .text-field {
    flex: 1;
  }
`;

const Messages = () => {
  const [text, setText] = useState<string>('');
  const ws = useContext(WebsocketContext);
  const dispatch = useAppDispatch();
  const { contact: { selectedContact }, message: messageState, auth: authState } = useAppSelector(state => state);
  const messages = messageState.messages.get(selectedContact) || [];
  
  const getContactDisplayName = () => {
    const received = messages.find(message => message.sender === selectedContact);
    if (received) {
      return <Typography
        variant="h4"
      >{received.body.senderUserName}</Typography>
    }

    return <Tooltip title="The user's indentity will be revealed after they've contacted you.">
        <Typography
          variant="h4"
        >Unkown user</Typography>
      </Tooltip>
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text && authState.clientId) {
      dispatch(sendMessage({
        sender: authState.clientId,
        recipient: selectedContact,
        body: {
          date: moment().valueOf(),
          senderUserName: authState.username,
          text,
        }
      }, ws));
      setText('');
    }
  }

  const clearConversation = () => {
    dispatch({
      type: ContactTypes.CLEAR,
    });
    dispatch({
      type: MessageTypes.REMOVE_CONTACT,
      payload: {
        recipient: selectedContact,
      }
    })
  }

  return (<ComponentContainer sx={{
    color: 'text.primary'
  }}>
    <Toolbar />
    {selectedContact ?  <>
      <HeaderContainer>
        {getContactDisplayName()}
        <IconButton color="error" onClick={clearConversation}>
          <DeleteIcon />
        </IconButton>
      </HeaderContainer>
      <Divider />
      <MessagesContainer>
      <Stack
        direction="column-reverse"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={0.5}
      >
        {messages.map(message => <MessageLine className={selectedContact === message.recipient ? 'sent' : undefined} key={message.body.date}>
            <MessageBubble
            elevation={3}
            sx={selectedContact === message.recipient ? {
              backgroundColor: 'info.dark'
            } : undefined}
          >{message.body.text}</MessageBubble>
        </MessageLine>)}
      </Stack>
      </MessagesContainer>
      <ActionContainer onSubmit={handleSubmit}>
        <TextField className="text-field" value={text} onChange={e => setText(e.target.value)} placeholder="Jot something here..." autoComplete="off"/>
        <Button variant="contained" type="submit">
          <SendIcon />
        </Button>
      </ActionContainer></> : <>
      
      </>
    }
  </ComponentContainer>)
}

export default Messages;