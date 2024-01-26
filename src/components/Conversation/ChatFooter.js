import React, { useState, useRef } from 'react'
import { Box, Stack, IconButton, InputAdornment, TextField } from '@mui/material'
import { styled, useTheme } from "@mui/material/styles"
import { Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User } from 'phosphor-react';
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from "react-redux";

import { socket } from '../../socket';

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px"
  }
}))

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

const ChatInput = ({ openPicker, setOpenPicker, setValue, value, inputRef, sendMessage }) => {

  const [openAction, setOpenAction] = useState(false);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") sendMessage()
  }

  return (<StyledInput
    inputRef={inputRef}
    value={value}
    onChange={handleInputChange}
    onKeyUp={handleEnter}
    fullWidth placeholder='Write a message...' variant='filled' InputProps={{
      disableUnderline: true,
      startAdornment: <InputAdornment position='end'>
        <Stack sx={{ width: "max-content" }}>
          <Stack sx={{ position: "relative", display: openAction ? "inline-block" : "none" }} >
            {Actions.map(el => {
              return (
                <Tooltip placement='right' key={el.y} title={el.title}>
                  <Fab sx={{ position: "absolute", top: -el.y, backgroundColor: el.color }} color="primary" aria-label="add">
                    {el.icon}
                  </Fab>
                </Tooltip>

              )
            })}
          </Stack>
          <IconButton onClick={() => setOpenAction((prev) => !prev)}>
            <LinkSimple />
          </IconButton>
        </Stack>
      </InputAdornment>,
      endAdornment: <InputAdornment position='end'>
        <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
          <Smiley />
        </IconButton>
      </InputAdornment>
    }}
  />)
}

export const ChatFooter = () => {
  const theme = useTheme();

  const { current_conversation } = useSelector(
    (state) => state.conversations.direct_chat
  );

  const { user_id } = useSelector(state => state.auth)


  const { room_id } = useSelector((state) => state.app);

  const [openPicker, setOpenPicker] = useState(false);

  const [value, setValue] = useState("");

  const inputRef = useRef(null);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
        emoji +
        value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }

  }

  const sendMessage = () => {
    setValue("")
    socket.emit("text_message", {
      message: linkify(value),
      conversation_id: room_id,
      from: user_id,
      to: current_conversation.user_id,
      type: containsUrl(value) ? "Link" : "Text",
    });
  }

  return (
    <Box p={2} sx={{ width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        {/* Chat Input */}
        <Stack sx={{ width: "100%" }}>
          <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
            <Picker theme={theme.palette.mode} data={data}
              onEmojiSelect={(emoji) => {
                handleEmojiClick(emoji.native);
              }} />
          </Box>
          <ChatInput
            inputRef={inputRef}
            value={value}
            setValue={setValue}
            sendMessage={sendMessage}
            openPicker={openPicker} setOpenPicker={setOpenPicker}
          />
        </Stack>

        <Box sx={{ height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
          <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>

            <IconButton
              onClick={sendMessage}>
              <PaperPlaneTilt color='#fff' />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
