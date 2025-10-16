import { useState } from "react";

function MyForm() {
const [text, setText] = useState('');

// const handleChange = (event) => {
//     setText(event.target.value);
//     console.log(event.target.value); // 수정: text → event.target.value
// }

const handleSubmit = (event) => {
    event.preventDefault(); // 오타 수정: preventDefult → preventDefault
    alert(`${text} 라고 입력하였습니다.`); // 템플릿 리터럴 안에서 `${text}`
}

return (
    <form onSubmit={handleSubmit}> {/* 함수 누락 수정 */}
    <input type="text" onChange={event => setText(event.target.value)} value={text} />
    <br />
    <br />
    <input type="submit" value="click하세요" />
    </form>
);
}

export default MyForm;
