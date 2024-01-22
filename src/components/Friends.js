import React from 'react'
import {
    Box,
    Badge,
    Stack,
    Avatar,
    Typography,
    IconButton,
    Button,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Chat } from "phosphor-react";
import { socket } from "../socket";

import StyledBadge from "./StyledBade"

const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));

const user_id = window.localStorage.getItem("user_id");


const UserElement = ({ img, firstName, lastName, online, _id }) => {
    const theme = useTheme();

    const name = `${firstName} ${lastName}`;

    return (
        <StyledChatBox sx={{ width: "100%", borderRadius: 1, backgroundColor: theme.palette.background.paper, }} p={2}>
            <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar alt={name} src={img} />
                        </StyledBadge>
                    ) : (
                        <Avatar alt={name} src={img} />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Button
                        onClick={() => {
                            socket.emit("friend_request", { to: _id, from: user_id }, () => {
                                alert("request sent");
                            });
                        }}
                    >
                        Send Request
                    </Button>
                </Stack>
            </Stack>
        </StyledChatBox>
    );
};

const FriendRequestElement = ({ img, firstName, lastName, incoming, missed, online, id, }) => {
    const theme = useTheme();
    const name = `${firstName} ${lastName}`;

    return (
        <StyledChatBox
            sx={{ width: "100%", borderRadius: 1, backgroundColor: theme.palette.background.paper, }}
            p={2}
        >
            <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                <Stack direction="row" alignItems={"center"} spacing={2}>
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar alt={name} src={img} />
                        </StyledBadge>
                    ) : (
                        <Avatar alt={name} src={img} />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Button
                        onClick={() => {
                            //  emit "accept_request" event
                            socket.emit("accept_request", { request_id: id });
                        }}
                    >
                        Accept Request
                    </Button>
                </Stack>
            </Stack>
        </StyledChatBox>
    );
};


const FriendElement = ({ img, firstName, lastName, incoming, missed, online, _id, }) => {
    const theme = useTheme();
    const name = `${firstName} ${lastName}`;

    return (
        <StyledChatBox
            sx={{
                width: "100%",

                borderRadius: 1,

                backgroundColor: theme.palette.background.paper,
            }}
            p={2}
        >
            <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                    {" "}
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar alt={name} src={img} />
                        </StyledBadge>
                    ) : (
                        <Avatar alt={name} src={img} />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <IconButton
                        onClick={() => {
                            // start a new conversation
                            socket.emit("start_conversation", { to: _id, from: user_id });
                        }}
                    >
                        <Chat />
                    </IconButton>
                </Stack>
            </Stack>
        </StyledChatBox>
    );
};

export { UserElement, FriendRequestElement, FriendElement };