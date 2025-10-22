import { Dialog, DialogActions , DialogContent, DialogTitle} from "@mui/material";
import { Car } from "../types";
import { ChangeEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";

function AddCar(){
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0,
    });

    const handleClickOpen = () => setOpen(true);

    const handleClickClose = () => setOpen(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value})
    }

    const queryClient = useQueryClient();

    const {mutate} = useMutation(addCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: err => {
            console.log(err);
        },
    });

    const handleSave = () =>{
        mutate(car);
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0,
        });
        handleClickClose();
    }

    return(
    <>
        <button onClick={handleClickOpen}>NewCar</button>
        <Dialog open={open} onClose={handleClickClose}>
            <DialogTitle>New Car</DialogTitle>
            <CarDialogContent car={car} handleChange={handleChange} />
            <DialogActions>
            <button onClick={handleClickClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
            </DialogActions>
        </Dialog>
    </>
    )
}

export default AddCar;