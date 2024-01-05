import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from "../../data"
import { MediaMsg, TextMsg, Timeline, ReplyMsg, LinkMsg, DocMsg } from './MsgTypes'

export const Message = ({ menu }) => {
    return (
        <Box p={3}>
            <Stack spacing={3} >
                {Chat_History.map(el => {
                    switch (el.type) {
                        case "divider":
                            //  Timeline
                            return <Timeline el={el} />
                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    // img msg
                                    return <MediaMsg menu={menu} el={el} />
                                case "doc":
                                    // Doc msg
                                    return <DocMsg menu={menu} el={el} />
                                case "link":
                                    // Link msg
                                    return <LinkMsg menu={menu} el={el} />

                                case "reply":
                                    // Reply msg
                                    return <ReplyMsg menu={menu} el={el} />;

                                default:
                                    // text msg
                                    return <TextMsg menu={menu} el={el} />
                            }
                        default:
                            return ""
                    }
                })}
            </Stack>
        </Box>
    )
}
