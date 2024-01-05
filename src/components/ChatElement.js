import React from 'react'
import { Box, Stack, Typography, Avatar, Badge } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import ".././App.css"
import StyledBadge from './StyledBade'

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const theme = useTheme()

    return (
        <Box p={2} sx={{
            width: "100%",
            borderRadius: 1,
            backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.paper
        }}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Stack direction={"row"} spacing={2}>
                    {online ?
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={img} />
                        </StyledBadge> : <Avatar src={img} />
                    }
                    <Stack spacing={0.3}>
                        <Typography variant='subtitle2'> {name} </Typography>
                        <Typography variant='caption'>  {msg} </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={"center"}>
                    <Typography sx={{ fontWeight: 600 }} variant='caption' >{time}</Typography>
                    <Badge color='primary' badgeContent={unread}  ></Badge>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ChatElement