import React, { useState } from 'react'
import { Box, Stack, IconButton, InputAdornment, TextField } from '@mui/material'
import { styled, useTheme } from "@mui/material/styles"
import { Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User } from 'phosphor-react';
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

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

const ChatInput = ({ setOpenPicker }) => {
  const [openAction, setOpenAction] = useState(false);

  return (<StyledInput fullWidth placeholder='Write a message...' variant='filled' InputProps={{
    disableUnderline: true,
    startAdornment: <InputAdornment>
      <Stack sx={{ width: "max-content" }}>
        <Stack sx={{ position: "relative", display: openAction ? "inline-block" : "none" }} >
          {Actions.map(el => {
            return (
              <Tooltip placement='right' key={el.y} title={el.title}>
                <Fab sx={{ position: "absolute", top: -el.y, backgroundColor: el.colour }} color="primary" aria-label="add">
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
    endAdornment: <InputAdornment>
      <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
        <Smiley />
      </IconButton>
    </InputAdornment>
  }}
  />)
}

export const Footer = () => {
  const [openPicker, setOpenPicker] = useState(false);

  const theme = useTheme()

  return (
    <Box p={2} sx={{ width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        {/* Chat Input */}
        <Stack sx={{ width: "100%" }}>
          <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
            <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
          </Box>
          <ChatInput setOpenPicker={setOpenPicker} />
        </Stack>

        <Box sx={{ height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
          <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>

            <IconButton>
              <PaperPlaneTilt color='#fff' />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
