import { useState } from 'react'
import { Link as RouterLink } from "react-router-dom"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Button, CircularProgress, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { Eye, EyeSlash } from 'phosphor-react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, ToggleLoader } from '../../redux/slices/auth'

const LoginForm = () => {

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)

    const { isLoading } = useSelector(state => state.auth)

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required")
    });

    const defaultValues = {
        email: "demo@ChatterBox.com",
        password: "123456"
    }

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        try {
            // submit data to backend
            dispatch(LoginUser(data))
            dispatch(ToggleLoader(true))

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

                    <RHFTextField name={"email"} label="Email address" />

                    <RHFTextField name={"password"} label="Password" type={showPassword ? "text" : "password"} InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }} />
                </Stack>
                <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
                    <Link component={RouterLink} to='/auth/reset-password' variant='body2' color={'inherit'} underline='always'>Forgot Password?</Link>
                </Stack>
                <Button disabled={isLoading} style={{ position: "relative" }} fullWidth color="inherit" size='large' type='submit' variant='contained'
                    sx={{
                        bgcolor: "text.primary", color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                        '&:hover': {
                            bgcolor: "text.primary",
                            color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                        }
                    }}>
                    {isLoading && <CircularProgress
                        sx={{ position: "absolute", }}
                        color="primary"
                        fourColor={true}
                        variant="indeterminate"
                    />}
                    <Typography sx={{ position: "absolute", }} textAlign={"center"}>Login</Typography>
                </Button>
            </FormProvider>
        </div>
    )
}

export default LoginForm