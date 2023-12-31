import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Gear } from 'phosphor-react'
import React, { useState } from 'react'
import { faker } from "@faker-js/faker";

import Logo from "../../assets/Images/logo.ico"

import { Nav_Buttons } from '../../data'
import useSettings from "../../hooks/useSettings"
import AntSwitch from '../../components/AntSwitch';
import { Profile_Menu } from '../../data';


const Sidebar = () => {

    const [selected, setSelected] = useState(0)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const { onToggleMode } = useSettings()

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme()
    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper, padding: 2, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", height: "100vh", width: 100 }}>
            <Stack direction={"column"} justifyContent={"space-between"} alignItems={"center"} sx={{ width: "100%", height: "100%" }} spacing={3}>
                <Stack alignItems={"center"} spacing={4}>
                    <Box sx={{
                        backgroundColor: theme.palette.primary.main,
                        height: 64, width: 64, borderRadius: 1.5
                    }}>
                        <img src={Logo} alt="Chat app logo" />
                    </Box>
                    <Stack spacing={3} sx={{ width: "max-content" }} direction={"column"} alignItems={"center"} >
                        {Nav_Buttons.map(el => (
                            el.index === selected ?
                                (<Box p={1} key={el.index} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                                    <IconButton sx={{ width: "max-content", color: "#fff" }} >
                                        {el.icon}
                                    </IconButton>
                                </Box>)
                                :
                                (
                                    <IconButton
                                        onClick={() => setSelected(el.index)}
                                        key={el.index}
                                        sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }} >
                                        {el.icon}
                                    </IconButton>
                                )
                        ))}
                        <Divider sx={{ width: "48px" }} />
                        {selected === 3 ?
                            <Box p={1} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                                <IconButton sx={{ width: "max-content", color: "#fff" }}>
                                    <Gear />
                                </IconButton>
                            </Box> : <IconButton
                                sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}
                                onClick={() => setSelected(3)}> <Gear /> </IconButton>
                        }
                    </Stack>
                </Stack>
                <Stack spacing={4}>
                    <AntSwitch defaultChecked onChange={() => {
                        onToggleMode()
                    }} />
                    <Avatar id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        src={faker.image.avatar()} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
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
                                    <MenuItem key={ind} onClick={handleClick}>
                                        <Stack sx={{ width: 100 }} direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
                                            <span> {el.title}</span>
                                            {el.icon}
                                        </Stack>
                                    </MenuItem>
                                )
                            })}
                        </Stack>
                    </Menu>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Sidebar