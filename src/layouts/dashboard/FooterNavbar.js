import { Avatar, Box, Divider, IconButton, Menu, Fade, MenuItem, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Gear } from 'phosphor-react'
import React, { useState } from 'react'
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux"

import Logo from "../../assets/Images/logo.ico"
import { Nav_Buttons, Profile_Menu } from '../../data'
import useSettings from "../../hooks/useSettings"
import AntSwitch from '../../components/AntSwitch';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../../redux/slices/auth';
import { ChangeTab } from '../../redux/slices/app';


const getPath = (index) => {
    switch (index) {
        case 0:
            return "/app"
        case 1:
            return "/group"
        case 2:
            return "/call"
        case 3:
            return "/settings"
        default:
            break;
    }
}

const getMenuPath = (index) => {
    switch (index) {
        case 0:
            return "/profile"
        case 1:
            return "/settings"
        case 2:
            // Todo => Updatae token and set isAuthenticated to false and logout the use
            return "/auth/login"

        default:
            break;
    }
}

const FooterNavbar = () => {
    const dispatch = useDispatch()
    const { selectedTab } = useSelector(state => state.app)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme()
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const { onToggleMode } = useSettings()

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ zIndex: 1, transition: "all 0.2s", position: "absolute", bottom: 0, backgroundColor: theme.palette.background.paper, padding: 2, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", height: "70px", width: "100%" }}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ width: "100%", height: "100%" }} spacing={3}>
                <Stack direction={"row"} sx={{ width: "100%" }} justifyContent={"space-around"} alignItems={"center"} spacing={3}>
                    {Nav_Buttons.map(el => (
                        el.index === selectedTab ?
                            (<Box p={1} key={el.index} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                                <IconButton sx={{ width: "max-content", color: "#fff" }} >
                                    {el.icon}
                                </IconButton>
                            </Box>)
                            :
                            (
                                <IconButton
                                    onClick={() => {
                                        dispatch(ChangeTab({ tabNumber: el.index }))
                                        navigate(getPath(el.index))
                                    }}
                                    key={el.index}
                                    sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }} >
                                    {el.icon}
                                </IconButton>
                            )
                    ))}
                    {selectedTab === 3 ?
                        <Box p={1} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                            <IconButton sx={{ width: "max-content", color: "#fff" }}>
                                <Gear />
                            </IconButton>
                        </Box> : <IconButton
                            sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}
                            onClick={() => {
                                dispatch(ChangeTab({ tabNumber: 3 }))
                                navigate(getPath(3))
                            }}> <Gear /> </IconButton>
                    }
                    <Avatar id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} />
                    <Menu
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        TransitionComponent={Fade}
                        id="profile-positioned-menu"
                        aria-labelledby='profile-positioned-button'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                    >
                        <Stack spacing={1} px={1} >
                            {Profile_Menu.map((el, ind) => {
                                return (
                                    <MenuItem key={ind} onClick={handleClose}>
                                        <Stack onClick={() => {
                                            ind === 2 ? dispatch(LogoutUser()) : navigate(getMenuPath(ind))
                                        }
                                        } sx={{ width: 100 }} direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
                                            <span> {el.title}</span>
                                            {el.icon}
                                        </Stack>
                                    </MenuItem>
                                )
                            })}
                        </Stack>
                    </Menu>
                </Stack>
            </Stack >
        </Box >
    )
}

export default FooterNavbar