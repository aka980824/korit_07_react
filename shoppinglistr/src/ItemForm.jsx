import { useState, useEffect } from "react";

export default function ItemForm({ editId, initialData, onSubmit, onCancel }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (initialData) {
        setName(initialData.name || "");
        // amount를 문자열로 변환해서 세팅
        setAmount(initialData.amount !== undefined ? initialData.amount.toString() : "");
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // amount를 숫자로 변환해서 넘김
        const success = await onSubmit({ name, amount: Number(amount) });
        if (success) {
        setName("");
        setAmount("");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        {editId !== null && <p>수정 중: ID {editId}</p>}
        <div>
            <label>
            파일명 (name):&nbsp;
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </label>
        </div>
        <div>
            <label>
            양 (amount):&nbsp;
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            </label>
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
            {editId !== null ? "수정하기" : "추가하기"}
        </button>
        {editId !== null && (
            <button
            type="button"
            onClick={() => {
                setName("");
                setAmount("");
                onCancel();
            }}
            style={{ marginLeft: "1rem" }}
            >
            취소
            </button>
        )}
        </form>
    );
}
