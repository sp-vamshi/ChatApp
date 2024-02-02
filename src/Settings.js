import { useState } from 'react';
import { Avatar, Box, Divider, IconButton, Stack, Typography, } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { faker } from "@faker-js/faker"
import {
    CaretLeft,
    Bell,
    Lock,
    Key,
    PencilCircle,
    Image,
    Note,
    Keyboard,
    Info,
} from "phosphor-react";
import Shortcuts from './sections/settings/Shortcuts';
import { useDispatch } from 'react-redux';
import { ChangeTab } from './redux/slices/app';
import { useNavigate } from 'react-router-dom';
import useDevice from './utils/useDevice';


const Settings = () => {
    const [openShortCuts, setOpenShortCuts] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [device] = useDevice()

    const handleCloseShortcuts = () => setOpenShortCuts(false)

    // const handleOpenShortcuts = () => setOpenShortCuts(true)



    const theme = useTheme()

    const list = [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: "Notifications",
            onclick: () => { },
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            // onclick: handleOpenTheme,
            onclick: () => { }
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => { },
        },
        // {
        //     key: 5,
        //     icon: <Note size={20} />,
        //     title: "Request Account Info",
        //     onclick: () => { },
        // },
        // {
        //     key: 6,
        //     icon: <Keyboard size={20} />,
        //     title: "Keyboard Shortcuts",
        //     onclick: handleOpenShortcuts,
        // },
    ];

    return (
        <Stack direction={"row"} sx={{ width: '100%' }}>
            {/* Left Panel */}
            <Box sx={{
                overflowY: 'auto', height: 'calc(100vh - 70px)', width: device.Desktop ? 320 : "100%",
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background, boxShadow: "0px 0px 2px rgba(0,0,0, 0.25)"
            }}
            >
                <Stack p={4} spacing={5}>
                    {/* Header */}
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <IconButton
                            onClick={() => {
                                dispatch(ChangeTab({ tabNumber: 0 }))
                                navigate("/app")
                            }}>
                            <CaretLeft
                                size={24} color='#4B4B4B' />
                        </IconButton>
                        <Typography variant='h6'>
                            Settings
                        </Typography>
                    </Stack>
                    {/* Profile */}
                    <Stack direction={"row"} spacing={3}>
                        <Avatar sx={{ height: 56, width: 56 }} src={faker.image.avatar()} alt={faker.name.fullName()} />
                        <Stack spacing={0.5}>
                            <Typography variant='article'>
                                {faker.name.fullName()}
                            </Typography>
                            <Typography variant='body2'>
                                {faker.random.word()}
                            </Typography>
                        </Stack>
                    </Stack>
                    {/* List of options */}
                    <Stack spacing={4}>
                        {list.map(({ key, icon, title, onclick }) => (
                            <Stack key={key} onClick={onclick} sx={{ cursor: "pointer" }} spacing={2}>
                                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                    {icon}
                                    <Typography variant='body2'>{title}</Typography>
                                </Stack>
                                {key !== 7 && <Divider />}
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </Box>

            {/* Right Panel */}
            {openShortCuts && <Shortcuts open={openShortCuts} handleClose={handleCloseShortcuts} />}
        </Stack>
    )
}

export default Settings