import styled from "@emotion/styled";
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField, Toolbar } from "@mui/material";
import moment from "moment";
import { FormEvent, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { WebsocketContext } from "../contexts/websocket.context";
import { sendMessage } from "../thunks";

const ComponentContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  padding: 10px 0;
  flex: 1;
`;

const ActionContainer = styled.form`
  display: flex;
  flex-direction: row;

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

  return (<ComponentContainer sx={{
    color: 'text.primary'
  }}>
    <Toolbar />
    {selectedContact ?  <>
      <div>{selectedContact ? getContactDisplayName() : 'No contact selected'}</div>
      <MessagesContainer>Messages Placeholder</MessagesContainer>
      <ActionContainer onSubmit={handleSubmit}>
        <TextField className="text-field" value={text} onChange={e => setText(e.target.value)} placeholder="Jot something here..."/>
        <Button variant="contained" type="submit">
          <SendIcon />
        </Button>
      </ActionContainer></> : <>
      
      </>
    }
  </ComponentContainer>)
}

export default Messages;