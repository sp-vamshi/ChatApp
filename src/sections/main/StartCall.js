import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search"
import { MagnifyingGlass } from 'phosphor-react';
import { CallElement } from '../../components/CallElement';
import { MembersList } from '../../data';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const StartCall = ({ open, handleClose }) => {
    return (
        <Dialog onClose={handleClose} fullWidth maxWidth="xs" open={open} sx={{ p: 4 }}
            keepMounted TransitionComponent={Transition} >
            {/*  */}
            <DialogTitle sx={{ mb: 3 }} >Start Call</DialogTitle>
            <Stack px={3} sx={{ width: "100%" }}>
                <Search>
                    <SearchIconWrapper>
                        <MagnifyingGlass color="#709CE6" />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder='Search' inputProps={{ "aria-label": "search" }} />
                </Search>
            </Stack>
            <DialogContent>
                {/* Call List */}
                <Stack height={"100%"} style={{ overflowY: 'auto' }}>
                    {MembersList.map(el => <CallElement {...el} />)}
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default StartCall