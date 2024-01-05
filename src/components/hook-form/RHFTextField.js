import { PropTypes } from "prop-types"
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material"


const RHFTextField = ({ name, helperText, ...others }) => {
    const { control } = useFormContext();

    return (
        <Controller name={name} control={control} render={({ field, fieldState: { error } }) => (
            <TextField
                {...field} value={typeof field.value === "number" && field.value === 0 ? "" : field.value} fullWidth error={!!error}
                helperText={error ? error.message : helperText} {...others} />
        )} />
    )
}

RHFTextField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node,
};


export default RHFTextField