import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { ChatList } from '../../data'
import ChatElement from '../../components/ChatElement'
import CreateGroup from '../../sections/main/CreateGroup'

const Group = () => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const theme = useTheme()
    return (
        <>
            <Stack direction={"row"} sx={{ width: "100%", }} >
                {/* Left */}
                <Box
                    sx={{
                        height: '100vh', width: 320, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                        backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background
                    }}>
                    <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
                        <Stack >
                            <Typography variant='h5'>Groups</Typography>
                        </Stack>
                        <Stack sx={{ width: "100%" }}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color="#709CE6" />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder='Search' inputProps={{ "aria-label": "search" }} />
                            </Search>
                        </Stack>
                        <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} >
                            <Typography variant='subtitle2' component={Link}>Create New Group</Typography>
                            <IconButton onClick={() => setOpenDialog(true)}>
                                <Plus style={{ color: theme.palette.background }} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <Stack spacing={2.5} sx={{ flexGrow: 1, overflowY: "auto", height: "100%" }}>
                            {/* SimpleBarStye */}
                            <Stack spacing={2.3}>
                                <Typography variant='subtitle2' sx={{ color: '#676667' }} >Pinned</Typography>
                                {/* Chat List */}
                                {ChatList.filter(el => el.pinned).map(el => {
                                    return <ChatElement key={el.id} {...el} />
                                })}
                                <Typography variant='subtitle2' sx={{ color: '#676667' }}>All Groups</Typography>
                                {ChatList.filter(el => !el.pinned).map(el => {
                                    return <ChatElement key={el.id} {...el} />
                                })}

                            </Stack>
                            {/* SimpleBarStye */}
                        </Stack>
                    </Stack>
                </Box>
                {/* Right */}
                {/* Coversation Component */}
            </Stack>
            {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}
        </>
    )
}

export default Group