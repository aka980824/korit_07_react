import { DialogContent } from "@mui/material";
import { Car } from "../types";
import { ChangeEvent } from "react";

type DialogFormProps = {
    car: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ car, handleChange }: DialogFormProps) {
    return (
        <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" name="brand" value={car.brand} placeholder="Brand" onChange={handleChange} />
            <input type="text" name="model" value={car.model} placeholder="Model" onChange={handleChange} />
            <input type="text" name="color" value={car.color} placeholder="Color" onChange={handleChange} />
            <input type="text" name="registrationNumber" value={car.registrationNumber} placeholder="Reg_No" onChange={handleChange} />
            <input type="number" name="modelYear" value={car.modelYear} placeholder="Year" onChange={handleChange} />
            <input type="number" name="price" value={car.price} placeholder="Price" onChange={handleChange} />
        </DialogContent>
    );
}

export default CarDialogContent;
