import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import * as Yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '../../components/hook-form/RHFTextField';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MEMBERS = ["Name1", "Name2", "Name3"]

const CreateGroupForm = ({ handleClose }) => {

    const NewGroupSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        members: Yup.array().min(2, 'Must have atleast 2 members')
    })

    const defaultValues = {
        title: '',
        members: []
    }

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues
    })

    const { reset, watch, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful, isValid } } = methods

    const onSubmit = async (data) => {
        try {
            console.log("Group Data", data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <Stack spacing={3}>
                <RHFTextField name="title" label={"Title"} />
                <RHFAutocomplete
                    name="members" label={"Members"} multiple freeSolo
                    options={MEMBERS.map(option => option)} ChipProps={{ size: "medium" }} />
            </Stack>
            <Stack sx={{ mt: 2 }} spacing={2} direction={"row"} alignItems={"center"} justifyContent={"end"}>
                <Button onClick={handleClose} >Cancel</Button>

                <Button type={"submit"} variant='contained'>
                    Create
                </Button>
            </Stack>
        </FormProvider>
    )
}


const CreateGroup = ({ open, handleClose }) => {
    return (
        <div>
            <Dialog fullWidth maxWidth="xs" open={open} sx={{ p: 4 }}
                keepMounted TransitionComponent={Transition} >
                <DialogTitle sx={{ mb: 3 }} >Create New Group</DialogTitle>
                <DialogContent>
                    {/* Form */}
                    <CreateGroupForm handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateGroup