import { PropTypes } from "prop-types"
import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material"

const RHFAutocomplete = ({ name, label, helperText, ...others }) => {
    const { control, setValue } = useFormContext();

    return (
        <Controller name={name} control={control} render={({ field, fieldState: { error } }) => (
            <Autocomplete
                {...field}
                onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
                renderInput={(params) => <TextField label={label} error={!!error} helperText={error ? error.message : helperText} {...params} />}
                value={typeof field.value === "number" && field.value === 0 ? "" : field.value} fullWidth error={!!error}
                helperText={error ? error.message : helperText} {...others} />
        )} />
    )
}

RHFAutocomplete.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node,
};

export default RHFAutocomplete