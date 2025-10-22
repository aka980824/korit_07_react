import { DialogContent, TextField, Stack } from "@mui/material";
import { Car } from "../types";
import { ChangeEvent } from "react";

type DialogFormProps = {
    car: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ car, handleChange }: DialogFormProps) {
    return (
        <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Stack spacing={2} mt={1}>
            <TextField label="Brand" name="brand" value={car.brand} onChange={handleChange} />
            <TextField label="Modle" name="model" value={car.model} onChange={handleChange} />
            <TextField label="Color" name="color" value={car.color} onChange={handleChange} />
            <TextField label="Reg_No"name="registrationNumber" value={car.registrationNumber} onChange={handleChange} />
            <TextField label="ModelYear"name="modelYear" value={car.modelYear} onChange={handleChange} />
            <TextField label="Price"name="price" value={car.price} onChange={handleChange} />
            </Stack>
        </DialogContent>
    );
}

export default CarDialogContent;
