import "./App.css";
import Button from "./Button/Button";
import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import MainTable from "./MainTable/MainTable";
import AddNewModal from "./AddNewModal/AddNewModal";
import toast, { Toaster } from "react-hot-toast";

export default function MyApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [filter, setFilter] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTaskToTable = (obj) => {
    setTableData([...tableData, obj]);
    closeModal();
    fetch(process.env.REACT_APP_BACKEND_LINK + "/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        toast.success(data?.message);
      })
      .catch((err) => {
        //console.log(err.message);
        toast.error(err.message);
      });
  };

  const fetchData = async () => {
    const result = await fetch(process.env.REACT_APP_BACKEND_LINK + "/load");
    result.json().then((json) => {
      console.log("Fetching all items");
      console.log(json);
      setTableData(json.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTableData = tableData.filter((tableData) => {
    if (filter === "all") {
      return true;
    } else if (filter === "todo") {
      return tableData.fulfillment !== "100";
    } else if (filter === "complete") {
      return tableData.fulfillment === "100";
    }
    return true;
  });

  return (
    <div className="transparent-container">
      <Toaster position="top-right"></Toaster>
      <h1 className="mainTitle">React to-do List</h1>

      <div className="controlls-buttons">
        <Button
          title="Add new to-do"
          onClick={openModal}
          style={{ marginRight: "auto" }}
        />
        <Button
          title="All"
          isSmall={true}
          isSelected={filter === "all"}
          onClick={() => {
            setFilter("all");
          }}
        />
        <Button
          title="To-do"
          isSmall={true}
          isSelected={filter === "todo"}
          onClick={() => {
            setFilter("todo");
          }}
        />
        <Button
          title="Complete"
          isSmall={true}
          isSelected={filter === "complete"}
          onClick={() => {
            setFilter("complete");
          }}
        />
      </div>
      <MainTable
        data={filteredTableData}
        setData={setTableData}
        reload={fetchData}
      />

      {isModalOpen && (
        <Modal close={closeModal}>
          <AddNewModal addTaskToTable={addTaskToTable} close={closeModal} />
        </Modal>
      )}
    </div>
  );
}
