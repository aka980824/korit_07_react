const BASE_URL = '/api/items'; // Spring Boot에서 매핑한 엔드포인트 예시

    // 전체 아이템 조회
    export async function fetchItems() {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
    }

    // 새 아이템 추가
    export async function addItem(item) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to add item');
    return await response.json();
    }
