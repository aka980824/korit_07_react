import { useState } from "react";

function MyComponent2(){
    const [name, SetName] =useState({
        firstName : 'John',
        lastName : 'Doe'
    });   
    
    return(
        <h1>
            Hello {name.firstName} {name.lastName}
        </h1>
    )
}


export default MyComponent2