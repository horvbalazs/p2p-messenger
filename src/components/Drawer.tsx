import { Button, Dialog, DialogTitle, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AlertState, AlertTypes, ContactTypes, Message } from "../models";
import { FormEvent, useContext, useState } from "react";
import { addContact } from "../thunks";
import { WebsocketContext } from "../contexts/websocket.context";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styled from "@emotion/styled";

const DialogContainer = styled.div`
  max-width: 50vw;
  min-width: 25vw;
  padding: 10px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AppDrawer = () => {
  const {auth: authState, message: messageState} = useAppSelector(state => state);
  const [open, setOpen] = useState<boolean>(false);
  const [contactId, setContactId] = useState<string>('');
  const ws = useContext(WebsocketContext);

  const dispatch = useAppDispatch();

  const getContactDisplayName = (messages: Message[], clientId: string): string => {
    if (messages.length === 0) {
      return clientId;
    }

    const received = messages.find(message => message.sender !== authState.clientId);
    return !received ? clientId : received.body.senderUserName;
  }

  const handleCopyClientId = () => {
    if (!authState.clientId) return;

    try {
      navigator.clipboard.writeText(authState.clientId);
      const alertData: AlertState = {
        show: true,
        type: 'success',
        message: 'Your clientID is copied to the clipboard.',
      }
      dispatch({
        type: AlertTypes.SHOW,
        payload: alertData,
      });
    } catch (e) {
      const alertData: AlertState = {
        show: true,
        type: 'error',
        message: 'Couldn\'t copy your clientID to the clipboard.',
      }
      dispatch({
        type: AlertTypes.SHOW,
        payload: alertData,
      });
    }
  }

  const openAddContact = () => {
    setOpen(true);
    setContactId('');
  }

  const handleAddContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactId) return;

    dispatch(addContact(contactId, ws));
    setOpen(false);
  }

  const selectConversation = (clientId: string) => {
    dispatch({
      type: ContactTypes.SELECT,
      payload: {
        clientId,
      }
    })
  }

  return (<>
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleCopyClientId}>
              <ListItemIcon>
                <ContentCopyIcon />
              </ListItemIcon>
              <ListItemText primary="Your ID:" secondary={authState.clientId}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={openAddContact}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add contact" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {Array.from(messageState.messages).map(([clientId, messages]) => 
            <ListItem key={clientId}>
              <ListItemButton onClick={() => selectConversation(clientId)}>
                <ListItemText 
                  primary={getContactDisplayName(messages, clientId)} 
                  secondary={messages.length > 0 ? messages[0]?.body.text : ''} />
              </ListItemButton>
            </ListItem>
            )}
        </List>
      </Box>
    </Drawer>
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogContainer>
        <DialogTitle>Add contact</DialogTitle>
        <FormContainer onSubmit={handleAddContact}>
          <TextField id="client-id" label="Client ID" variant="outlined" onChange={e => setContactId(e.target.value)} value={contactId} />
          <Button variant="contained" type="submit">
            Done
          </Button>
        </FormContainer>
      </DialogContainer>
    </Dialog>
  </>)
}
export default AppDrawer;