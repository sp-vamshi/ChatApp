import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from "../../data"
import { MediaMsg, TextMsg, Timeline, ReplyMsg, LinkMsg, DocMsg } from './MsgTypes'

export const Message = ({ currentMessages, menu }) => {
    return (
        <Box p={3}>
            <Stack spacing={3} >
                {currentMessages?.map((el, index) => {
                    switch (el.type) {
                        case "divider":
                            //  Timeline
                            return <Timeline key={index} el={el} />
                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    // img msg
                                    return <MediaMsg key={index} menu={menu} el={el} />
                                case "doc":
                                    // Doc msg
                                    return <DocMsg key={index} menu={menu} el={el} />
                                case "link":
                                    // Link msg
                                    return <LinkMsg key={index} menu={menu} el={el} />

                                case "reply":
                                    // Reply msg
                                    return <ReplyMsg key={index} menu={menu} el={el} />;

                                default:
                                    // text msg
                                    return <TextMsg key={index} menu={menu} el={el} />
                            }
                        default:
                            return ""
                    }
                })}
            </Stack>
        </Box>
    )
}
