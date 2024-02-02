import React, { useState } from 'react'
import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { CallLogElement } from '../../components/CallElement'
import { CallLogs } from '../../data'
import StartCall from '../../sections/main/StartCall'
import useDevice from '../../utils/useDevice'

const Calls = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [device] = useDevice()

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
                        height: 'calc(100vh - 70px)', width: device.Desktop ? 320 : "100%", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                        backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background
                    }}>
                    <Stack p={3} spacing={2} sx={{ maxHeight: "100%" }}>
                        <Stack >
                            <Typography variant='h5'>Call Logs</Typography>
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
                            <Typography variant='subtitle2' component={Link}>Start Conversation</Typography>
                            <IconButton
                                onClick={() => setOpenDialog(true)}
                            >
                                <Plus style={{ color: theme.palette.background }} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <Stack spacing={2.5} sx={{ flexGrow: 1, overflowY: "auto", height: "100%" }}>
                            {/* SimpleBarStye */}
                            <Stack spacing={2.3}>
                                <Typography variant='subtitle2' sx={{ color: '#676667' }} >Pinned</Typography>
                                {/* Call Logs */}
                                {CallLogs.map(el => <CallLogElement {...el} />)}
                            </Stack>
                            {/* SimpleBarStye */}
                        </Stack>
                    </Stack>
                </Box>
                {/* Right */}
                {/* Coversation Component */}
            </Stack>
            {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog} />}
        </>
    )
}

export default Calls