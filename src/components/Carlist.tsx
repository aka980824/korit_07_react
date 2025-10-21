// src/components/Carlist.tsx

// table 렌더링용 CarResponse가 더 이상 필요 없어서 import 생략 가능
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Snackbar } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";
function Carlist() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  // 데이터 가져오기
  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  // 삭제 요청 mutation
  const { mutate } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      console.log("자동차 삭제 성공");
      // 삭제 성공 시 캐시된 쿼리 리프레시
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      console.error("삭제 실패:", err);
    }
  });

  // 컬럼 정의
  const columns: GridColDef[] = [
    {field: 'brand', headerName: 'Brand', width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'registrationNumber', headerName: 'Reg.nr', width: 150},
    {field: 'modelYear', headerName: 'Model Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button 
          onClick={() => {
            if (confirm(`${params.row.brand}의 ${params.row.model} 자동차를 삭제하시겠습니까?`)) {
              mutate(params.row._links.self.href);}}
            }
        >
          Delete
        </button>
      )
    }
  ];

  // 로딩 처리
  if (!isSuccess) {
    return <span>Loading... 🔮</span>;
  }

  // 에러 처리
  if (error) {
    return <span>자동차 데이터를 불러오는 데 실패했습니다. 😱</span>;
  }

  // 렌더링
  return (
    <div style={{ height: 600, width: '100%' }}>
      <AddCar/>
      <DataGrid
          rows={data}
          columns={columns}
          getRowId={row => row._links.self.href}
        />  
        <Snackbar 
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message='선택한 자동차 정보가 삭제되었습니다 🚓'
        />
        
    </div>
  );
}

export default Carlist;
