import { useState } from "react";

function MyForm3(){

    const[ user, setUser] = useState({
        firstName: '',
        lastName: '',
        email:''

    });

    const handleSubmit = (event) => {
        alert(`Hello, ${user.firstName} ${user.lastName}`);
        event.preventDefault();
    }

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };


    return(
        <form onSubmit={handleSubmit}>
            <label>FirstName : </label>
            <input type="text" name="firstName" onChange={handleChange} value={user.firstName} placeholder="FirstName"/>
        <br />
            <label>LastName : </label>
            <input type="text" value={user.lastName} name="lastName" onChange={handleChange} placeholder="LastName"/>
        <br />
            <label>Email : </label>
            <input type="email" value={user.email} name="email" onChange={handleChange} placeholder="Email"/>
        <br /><br />
        <input type="submit" value="제출" />
        </form>
    );

}

export default MyForm3;