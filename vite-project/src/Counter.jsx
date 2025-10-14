import { useState } from "react";

function Counter(){
    const [count, setCount] = useState(0);

    return(
    <div
    style={{
        border: "2px solid white",  // 흰색 테두리
        padding: "20px",
        width: "300px",
        height: "150px",
        overflow: "auto",           // 드래그/스크롤 가능
        backgroundColor: "#282c34", // 배경 어둡게 (선명하게 보이도록)
        color: "white",             // 글자 흰색
    }}
    >
    <p>버튼 클릭 횟수 = {count}</p>
    <button onClick={() => setCount(count + 1)} style={{ marginRight: "10px" }}>
        증가
    </button>
    <button onClick={() => setCount(count - 1)}>감소</button>

      {/* 내용이 많아지면 스크롤 생김 */}
    <p>추가 내용 예시 1</p>
    <p>추가 내용 예시 2</p>
    <p>추가 내용 예시 3</p>
    <p>추가 내용 예시 4</p>
    </div>
    );
}

export default Counter