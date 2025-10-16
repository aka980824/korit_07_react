import { useState } from "react";

function MyForm() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
    console.log(text);
  }

  const handleSubmit = (event) => {
    alert('`${text}` 라고 입력하였습니다.')
    event.preventDefult();
  }

  return(
    <form onSubmit={}>
      <input type="text" onChange={handleChange} value={text}/>
      <br />
      <br />
      <input type="submit" value = 'click하세요' />
    </form>
  );

  }

export default MyForm