import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from "../../data"
import { MediaMsg, TextMsg, Timeline, ReplyMsg, LinkMsg, DocMsg } from './MsgTypes'

export const Message = () => {
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
                                    return <MediaMsg el={el} />
                                    break;
                                case "doc":
                                    // Doc msg
                                    return <DocMsg el={el} />
                                    break;
                                case "link":
                                    // Link msg
                                    return <LinkMsg el={el} />

                                case "reply":
                                    // Reply msg
                                    return <ReplyMsg el={el} />;

                                default:
                                    // text msg
                                    return <TextMsg el={el} />
                            }
                            break;

                        default:
                            return ""
                    }
                })}
            </Stack>
        </Box>
    )
}
