import styled from "@emotion/styled";
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, IconButton, Paper, Stack, TextField, Toolbar, Typography } from "@mui/material";
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
  justify-content: center;
  gap: 5px;
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
      return received.body.senderUserName;
    }

    return selectedContact;
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
        <Typography
          variant="h4"
        >{getContactDisplayName()}</Typography>
        <IconButton color="error" onClick={clearConversation}>
          <DeleteIcon />
        </IconButton>
      </HeaderContainer>
      <MessagesContainer>
      <Stack
        direction="column-reverse"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={0.5}
      >
        {messages.map(message => <MessageLine className={selectedContact === message.recipient ? 'sent' : undefined}>
            <MessageBubble
            elevation={3}
            sx={selectedContact === message.recipient ? {
              backgroundColor: 'info.dark'
            } : undefined}
            key={message.body.date}
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