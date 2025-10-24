export default function ItemList({ items, loading, onEdit, onDelete }) {
if (loading) return <p>불러오는 중...</p>;

if (items.length === 0) return <p>아이템이 없습니다.</p>;

return (
    <table
    border="1"
    cellPadding="10"
    style={{ margin: "0 auto", minWidth: "400px" }}
    >
    <thead>
        <tr>
        <th>ID</th>
        <th>파일명 (name)</th>
        <th>양 (amount)</th>
        <th>동작</th>
        </tr>
    </thead>
    <tbody>
        {items.map(({ id, name, amount }) => (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{amount}</td>
            <td>
            <button onClick={() => onEdit({ id, name, amount })}>수정</button>
            <button
                onClick={() => onDelete(id)}
                style={{ marginLeft: "0.5rem" }}
            >
                삭제
            </button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
);
}
