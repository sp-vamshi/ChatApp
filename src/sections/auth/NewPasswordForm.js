import { useState } from 'react'
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { Eye, EyeSlash } from 'phosphor-react'
import { useDispatch } from 'react-redux'

import { ResetPassword } from '../../redux/slices/auth'

const NewPasswordForm = () => {
    const [queryParameters] = useSearchParams()
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)

    const NewPasswordSchema = Yup.object().shape({
        password: Yup.string().min(6, 'Password must be atleast 6 characters').required("Password is required"),
        confirmPassword: Yup.string().required("Password is required").oneOf([Yup.ref('password'), null], 'Password must match.')
    });

    const defaultValues = {
        password: "",
        confirmPassword: ""
    }

    const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        try {
            // submit data to backend
            dispatch(ResetPassword({ ...data, token: queryParameters.get("token") }))
        } catch (error) {
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message
            })
        }
    }

    return (
        <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
                <Stack spacing={3}>
                    {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

                    <RHFTextField name={"password"} label="New Password" type={showPassword ? "text" : "password"} InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }} />
                    <RHFTextField name={"confirmPassword"} label="Confirm Password" type={showPassword ? "text" : "password"} InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }} />
                    <Button fullWidth color="inherit" size='large' type='submit' variant='contained'
                        sx={{
                            bgcolor: "text.primary", color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                            '&:hover': {
                                bgcolor: "text.primary",
                                color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                            }
                        }}>
                        Submit
                    </Button>
                </Stack>

            </FormProvider>
        </div>
    )
}

export default NewPasswordForm