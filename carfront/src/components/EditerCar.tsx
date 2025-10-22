import { useState, ChangeEvent } from "react";
import { Car, CarResponse, CarEntity } from "../types";
import { Dialog, DialogTitle, DialogActions ,Button, IconButton} from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Tooltip from '@mui/material/Tooltip';

type FormProps = {
    cardata: CarResponse;
};

function EditerCar({ cardata }: FormProps) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0,
    });

    const { mutate } = useMutation(updateCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.log(err);
        }
    });


    const handleClickOpen = () => {
        setOpen(true);
        // 모델이 열렸을때 특정 아이디에 맞는 정보를 불러오는 것이 좋음. 그래서 Addcar에서의 
        // 핸들클릭오픈() 코드라인과 차이가 발생
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price,
        })
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
    const url = cardata._links.self.href;
    const carEntity: CarEntity = { car, url };
    mutate(carEntity);  
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0,
        });
    setOpen(false); 
};

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCar({
            ...car,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <Tooltip title="Edit Car">
            <IconButton onClick={handleClickOpen} aria-label="edit" size="small"><EditRoundedIcon fontsize="small"/></IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel | 취소</Button>
                    <button onClick={handleSave}>Save | 저장</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditerCar;
