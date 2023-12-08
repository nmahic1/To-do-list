import "./MainTable.css";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { useState } from "react";
import Modal from "../Modal/Modal";
import AddNewModal from "../AddNewModal/AddNewModal";
import React from "react";
import Button from "../Button/Button";
import toast from "react-hot-toast";

function MainTable({ data, filter, setData, reload }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(data);
  const [editTableData, setEditTableData] = useState([]);
  const [deletePromptModal, setDeletePromptModal] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editTaskToTable = (obj) => {
    setEditTableData([...editTableData, obj]);
    closeModal();
  };

  const filteredData = data.filter((tableData) => {
    if (filter === "all") {
      return true;
    } else if (filter === "todo") {
      return tableData.fulfillment !== "100";
    } else if (filter === "complete") {
      return tableData.fulfillment === "100";
    }
    return true;
  });

  /* const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };*/

  const handleDelete = async (index) => {
    await fetch(process.env.REACT_APP_BACKEND_LINK + "/remove/" + index, {
      method: "DELETE",
    });
    reload();
    setDeletePromptModal(false);
    toast.success("Succesfully Deleted Row!");
  };

  return (
    <table className="table">
      <tr className="header">
        <th>Task</th>
        <th>Description</th>
        <th>Category</th>
        <th>When</th>
        <th>Priority</th>
        <th>Fulltime</th>
        <th></th>
        <th></th>
      </tr>

      <tbody>
        {filteredData.map((tableData, index) => {
          console.log(tableData);
          return (
            <tr key={index}>
              <td>{tableData.name}</td>
              <td>{tableData.description}</td>
              <td>{tableData.category}</td>
              <td>
                {tableData.date} {tableData.time}
              </td>
              <td>{tableData.priority}</td>
              <td>{tableData.fulfillment}</td>
              <td>
                <img src={editIcon} alt="Edit icon" onClick={openModal} />
              </td>
              <td>
                <img
                  src={deleteIcon}
                  alt="Delete icon"
                  onClick={() => setDeletePromptModal(tableData._id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      {deletePromptModal && (
        <Modal close={() => setDeletePromptModal(false)}>
          <h1 style={{ textAlign: "center", fontFamily: "arial" }}>
            Are you sure ?
          </h1>
          <Button
            title="Delete"
            onClick={() => handleDelete(deletePromptModal)}
            style={{ border: "1px solid black", marginRight: "100px" }}
          ></Button>

          <Button
            onClick={() => setDeletePromptModal(false)}
            style={{ border: "1px solid black" }}
          >
            Cancel
          </Button>
        </Modal>
      )}
      {isModalOpen && (
        <Modal close={closeModal}>
          <AddNewModal addTaskToTable={editTaskToTable} close={closeModal} />
        </Modal>
      )}
    </table>
  );
}

export default MainTable;
