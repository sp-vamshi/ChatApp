import { Stack, TextField } from '@mui/material'
import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const RHFOtp = ({ keyName = "", inputs = [], ...others }) => {
    const codeRef = useRef(null)

    const { control } = useFormContext();

    const handleChangeWithNextField = (event, handleChange) => {

        const { maxLength, value, name } = event.target

        const fieldIndex = name.replace(keyName, "");

        const fieldIntIndex = Number(fieldIndex)

        const nextField = document.querySelector(`input[name=${keyName}${fieldIntIndex + 1}`)

        if (value.length > maxLength) {
            event.target.value = value[0];
        }

        if (value.length >= maxLength && fieldIntIndex < 6 && nextField) nextField.focus();

        handleChange(event);
    }

    return (
        <Stack direction={"row"} spacing={2} justifyContent={"center"} ref={codeRef} >

            {inputs.map((name, index) => (
                <Controller key={name} name={`${keyName}${index + 1}`} control={control} render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field} error={!!error} autoFocus={index === 0} placeholder='-'
                        onFocus={(e) => e.currentTarget.select()}
                        onChange={(e) => { handleChangeWithNextField(e, field.onChange); }}
                        InputProps={{
                            sx: {
                                width: { xs: 36, sm: 56 },
                                height: { xs: 36, sm: 56 },
                                '& input': { p: 0, textAlign: "center" }
                            }
                        }}
                        inputProps={{
                            maxLength: 1,
                            type: "number"
                        }}
                        {...others}
                    />
                )} >

                </Controller>
            ))}

        </Stack>
    )
}

export default RHFOtp