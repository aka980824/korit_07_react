import { useState } from "react";

function MyForm4(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = (event) => {
    event.preventDefault();
    alert(`확인, ${firstName} ${lastName} ${email}`);
    };
    return(
        <form onSubmit={handleSubmit}>
            <label>FirstName : </label>
            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="FirstName"/>
            <br />
            <label>LastName : </label>
            <input type="text" name="lasttName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="LastName"/>
            <br />
            <label>Email : </label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <br />
            <input type="submit" value="제출" />
        </form>
    )

}

export default MyForm4;