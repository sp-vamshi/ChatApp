import { useState } from 'react'
import { Box, Stack, IconButton, Tabs, Tab, Typography, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { useDispatch } from 'react-redux'
import { UpdateSideBarType } from '../redux/slices/app'
import { CaretLeft } from 'phosphor-react'
import { faker } from '@faker-js/faker'
import { DocMsg, LinkMsg } from './Conversation/MsgTypes'
import { SHARED_DOCS, SHARED_LINKS } from '../data'

export const SharedMessages = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const theme = useTheme()
    const dispatch = useDispatch()


    return (
        <Box sx={{ width: 320, height: '100vh' }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                }}>
                    <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{ height: "100%", p: 2 }}>
                        <IconButton onClick={() => dispatch(UpdateSideBarType("CONTACT"))} ><CaretLeft /></IconButton>
                        <Typography variant='subtitle2'>Shared Messages</Typography>
                    </Stack>
                </Box>
                <Tabs sx={{ px: 2, pt: 2 }} value={value} onChange={handleChange} centered>
                    <Tab label="Media" />
                    <Tab label="Links" />
                    <Tab label="Docs" />
                </Tabs>
                {/* Body */}
                <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "auto" }} p={3} spacing={value === 1 ? 1 : 3}>
                    {(() => {
                        switch (value) {
                            case 0:
                                // Images
                                return <Grid container spacing={2}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(el => (
                                        <Grid key={el} item xs={4} >
                                            <img src={faker.image.avatar()} alt={faker.name.fullName()} />
                                        </Grid>
                                    ))}
                                </Grid>
                            case 1:
                                // Links
                                return SHARED_LINKS.map(el => <LinkMsg el={el} />)
                            case 2:
                                // Docs
                                return SHARED_DOCS.map(el => <DocMsg el={el} />)
                            default:
                                break;
                        }
                    })()}
                </Stack>
            </Stack>
        </Box>
    )
}
