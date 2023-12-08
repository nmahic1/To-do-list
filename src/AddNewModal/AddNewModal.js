import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./AddNewModal.css";

const AddNewModal = ({ addTaskToTable, close, editTableData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setWhenDate] = useState("");
  const [time, setWhenTime] = useState("");
  const [priority, setPriority] = useState("low");
  const [fulfillment, setFulfillment] = useState("50");
  const [isDisabled, setIsDisabled] = useState(true);

  const clearState = () => {
    setName("");
    setDescription("");
    setCategory("");
    setWhenDate("");
    setWhenTime("");
    setPriority("");
    setFulfillment("");
  };

  useEffect(() => {
    if (editTableData) {
      setName(editTableData.name);
      setDescription(editTableData.description);
      setCategory(editTableData.category);
      setWhenDate(editTableData.date);
      setWhenTime(editTableData.time);
      setPriority(editTableData.priority);
      setFulfillment(editTableData.fulfillment);
    }
  }, []);

  useEffect(() => {
    console.log(name);
    if (
      name !== "" &&
      description !== "" &&
      category !== "" &&
      date !== "" &&
      time !== "" &&
      priority !== "" &&
      fulfillment !== ""
    )
      setIsDisabled(false);
    else {
      setIsDisabled(true);
    }
  }, [name, description, category, date, time, priority, fulfillment]);

  const handleSave = () => {
    let obj = {
      name: name,
      description: description,
      category: category,
      date: date,
      time: time,
      priority: priority,
      fulfillment: fulfillment,
    };
    addTaskToTable(obj);
    clearState();
    close();
  };

  return (
    <div className="add-new-item-wrapper">
      <h1
        style={{
          gridColumn: "1/3",
        }}
      >
        Add new to-do
      </h1>
      <div>
        <Input
          title="Name:"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <Input
          title="Description:"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Input
          title="Category:"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <Input
          title="Date:"
          value={date}
          onChange={(event) => setWhenDate(event.target.value)}
        />
        <Input
          title="Time:"
          value={time}
          onChange={(event) => setWhenTime(event.target.value)}
        />
      </div>
      <div style={{ display: "grid" }}>
        <Input
          title="Priority: "
          type="select"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />
        <Input
          title="Fulfillment: "
          type="range"
          value={fulfillment}
          onChange={(event) => setFulfillment(event.target.value)}
        />
        <div style={{ display: "flex", alignSelf: "end", gap: "10px" }}>
          <Button
            onClick={handleSave}
            title="Save"
            isSmall={true}
            style={{ border: "1px solid black", marginLeft: "100px" }}
            disabled={isDisabled}
          />
          <Button
            style={{ border: "1px solid black" }}
            title="Cancle"
            isSmall={true}
            onClick={close}
          />
        </div>
      </div>
    </div>
  );
};
export default AddNewModal;
