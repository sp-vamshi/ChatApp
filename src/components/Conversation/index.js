import React, { useEffect, useRef } from 'react'
import { Box, Stack } from '@mui/material'
import { useTheme } from "@mui/material/styles";
import { ChatHeader } from './ChatHeader';
import { ChatFooter } from './ChatFooter';
import { Message } from './Message';
import { useSelector, useDispatch } from 'react-redux';

import {
    FetchCurrentMessages,
    SetCurrentConversation,
} from "../../redux/slices/conversation";

import { socket } from "../../socket"

export const Conversation = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { user_id } = useSelector(state => state.auth)


    const messageListRef = useRef(null);

    const { current_messages, conversations } = useSelector(
        (state) => state.conversations.direct_chat
    );

    const { room_id } = useSelector((state) => state.app);

    useEffect(() => {
        const current = conversations.find((el) => el?.id === room_id);
        socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
            // data => list of messages
            dispatch(FetchCurrentMessages({ messages: data, user_id }));
        });
        dispatch(SetCurrentConversation(current));
    }, [room_id,]);

    useEffect(() => {
        // Scroll to the bottom of the message list when new messages are added
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [current_messages]);

    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"} >
            {/* Chat Header */}
            <ChatHeader />

            {/* Msgs */}
            <Box
                ref={messageListRef}
                width={"100%"}
                sx={{
                    position: "relative",
                    flexGrow: 1,
                    overflow: "scroll",
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F0F4FA"
                            : theme.palette.background,

                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Message currentMessages={current_messages} menu={true} />
            </Box>

            {/* Chat Footer */}
            <ChatFooter />
        </Stack>
    )
}
