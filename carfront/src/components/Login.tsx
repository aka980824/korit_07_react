import axios from "axios";
import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

type User = {
    username: string;
    password: string;
};

function Login() {
    const [user, setUser] = useState<User>({
    username: "",
    password: "",
    });

const [isAuthenticated, setAuth] = useState(false);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setUser({ ...user, [event.target.name]: event.target.value });
};

const handleLogin = () => {
axios
    .post(import.meta.env.VITE_API_URL + "logn", user, { headers: { 'Content-Type': 'application/json'},
    })
    .then((res) => {
    const jwtToken = res.headers.authorization;  // 백슬래시 제거
    if (jwtToken !== null) 
        { sessionStorage.setItem("jwt", jwtToken);
        setAuth(true); alert("Login Successful"); }
    else{ 
        alert("Login Failed"); 
    }
    
})
    .catch((err) => {
    console.error(err);
    });
};

return (
<Stack spacing={2} mt={2} alignItems="center">
    <TextField
        name="username"
        label="Username"
        value={user.username}
        onChange={handleChange}
        />
    <TextField
        type="password"
        name="password"
        label="Password"
        value={user.password}
        onChange={handleChange}
    />
    <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
    </Button>
</Stack>
);
}

export default Login;
