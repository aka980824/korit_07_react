import { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";

const API_URL = "http://localhost:8080/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", amount: "" });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("목록을 불러오는데 실패했습니다.");
      const data = await res.json();
      setItems(data);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddOrUpdate = async ({ name, amount }) => {
    if (!name || amount === "" || amount === null) {
      setMessage("이름과 양은 필수 입력입니다.");
      return false;
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount)) {
      setMessage("양은 숫자여야 합니다.");
      return false;
    }

    const payload = { name, amount: parsedAmount };

    try {
      let res;
      if (editId !== null) {
        res = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("서버 오류 발생");

      setMessage(editId !== null ? "수정 성공!" : "추가 성공!");
      setEditId(null);
      setEditData({ name: "", amount: "" });
      fetchItems();
      return true;
    } catch (error) {
      setMessage(error.message);
      return false;
    }
  };

  const handleDelete = async (deleteId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`${API_URL}/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("삭제 실패");
      setMessage("삭제 성공!");
      fetchItems();
    } catch (e) {
      setMessage(e.message);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    // amount는 string으로 변환해서 넣어야 input에서 제대로 표시됨
    setEditData({ name: item.name, amount: item.amount?.toString() || "" });
    setMessage("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({ name: "", amount: "" });
    setMessage("");
  };

  return (
    <div
      id="root"
      style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}
    >
      <h1>쇼핑리스트 관리</h1>

      <ItemForm
        editId={editId}
        initialData={editData}
        onSubmit={handleAddOrUpdate}
        onCancel={handleCancelEdit}
      />

      {message && <p style={{ color: "red" }}>{message}</p>}

      <ItemList
        items={items}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
