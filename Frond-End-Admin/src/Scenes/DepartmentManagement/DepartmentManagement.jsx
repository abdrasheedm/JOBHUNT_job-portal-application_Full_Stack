import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Conponents/Header";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DepartmentModal from "../../Conponents/DepartmentModal";

function DepartmentManagement() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  const [departments, setDepartments] = useState([]);
  const fetchDepartments = async () => {
    axios.get("all-departments/").then((res) => {
      setDepartments(res.data);
    });
  };

  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [depId, setDepId] = useState();

  const handleOnClose = () => {
    document.body.style.overflow = "unset";
    setIsModal(false);
  };

  const [isDeleted, setIsDeleted] = useState(false);

  const removeDepartment = (id) => {
    axios.get(`remove-department-view/?dep_id=${id}`).then((res) => {
      setIsDeleted(!isDeleted)
    });
  };

  useEffect(() => {
    fetchDepartments();
  }, [isModal, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "category_name",
      headerName: "Category Name",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter : (tableData) => tableData.row.category.category_name,

    },
    {
      field: "department_name",
      headerName: "Depatment Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              sx={{ backgroundColor: colors.blueAccent[700], marginX: 5 }}
              variant="contained"
              onClick={() => {
                setIsModal(true);
                setModalType("edit")
                setDepId(params.row.id)
              }}
            >
              Edit
            </Button>
            <Button
              sx={{ backgroundColor: colors.blueAccent[700] }}
              variant="contained"
              onClick={() => removeDepartment(params.row.id)}
            >
              Remove
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Departments" subtitle="Managing Departments" />
      <div className="flex justify-end mr-10">
        <Button
          sx={{
            color: "white",
            backgroundColor: colors.blueAccent[700],
            justifyContent: "end",
          }}
          onClick={() => {
            setIsModal(true);
            setModalType("add");
          }}
        >
          Add Department
        </Button>
      </div>
      <Box
        m="40px 20px 0 20px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={departments} columns={columns} />
      </Box>
      <DepartmentModal
        visible={isModal}
        onClose={handleOnClose}
        Type={modalType}
        DepId={depId}
      />
    </Box>
  );
}

export default DepartmentManagement;
