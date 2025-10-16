type HelloProps = {
    name: string;
    age: number;
};

function HelloComponent({name,age}: HelloProps) {
return (
    <div>
        <h1>Hi! {name}, you are {age} years old</h1>
    </div>
    
) 
}

export default HelloComponent;
