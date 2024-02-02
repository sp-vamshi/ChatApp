import React from "react";
import { Chats } from "./Chats";
import { Stack, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import { Conversation } from "../../components/Conversation";
import { Contact } from "../../components/Contact";
import { useSelector } from "react-redux";
import { SharedMessages } from "../../components/SharedMessages";
import { StarredMessages } from "../../components/StarredMessages";
import NoChatSVG from "../../assets/Illustration/NoChat";
import useDevice from "../../utils/useDevice";


const GeneralApp = () => {

  const theme = useTheme()
  const { sidebar, chat_type, room_id } = useSelector((store) => store.app)
  const [device] = useDevice()

  function getWidth() {
    if (sidebar.open) {
      return "calc(100vw - 740px)"
    } else {
      return "calc(100vw - 420px)"
    }
  }


  return (
    <Stack direction={"row"} sx={{ width: "100%", }}>
      {/* Chats */}
      {
        (() => {
          if (device.Desktop || (device.Mobile && room_id === null)) {
            return <Chats />
          }
        })()
      }
      <Box sx={{ height: "100", width: getWidth(), backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.default }}>
        {(() => {
          if ((device.Mobile && room_id !== null && chat_type === "individual" && !sidebar.open) || device.Desktop && room_id !== null && chat_type === "individual") {
            return <Conversation />
          }
        })()}

        {device.Desktop && room_id === null &&
          <Stack Stack spacing={2} sx={{ height: '100%', width: "100%", }} alignItems={"center"} justifyContent={"center"}>
            <NoChatSVG />
            <Typography variant="subtitle2" >Select a conversation or start new one</Typography>
          </Stack>
        }
      </Box >
      {
        sidebar.open && (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />
            case "STARRED":
              return <StarredMessages />
            case "SHARED":
              return <SharedMessages />
            default:
              break;
          }
        })()
      }
    </Stack >
  );
};

export default GeneralApp;
