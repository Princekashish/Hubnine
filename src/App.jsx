import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import { MdPendingActions } from "react-icons/md";
import { IoMdCloudDone } from "react-icons/io";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activecard, setActivecard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrag = (status, position) => {
    if (activecard == null) return;

    const taskToMove = tasks[activecard];
    const updatedTasks = tasks.filter((task, i) => i !== activecard);

    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    setTasks(updatedTasks);
    setActivecard(null); 
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="Payment pending"
          tasks={tasks}
          status="todo"
          icon=<MdPendingActions size={25}/>
          handleDelete={handleDelete}
          setActivecard={setActivecard}
          onDrag={onDrag}
        />
        <TaskColumn
          title="Payment Completed"
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          setActivecard={setActivecard}
          onDrag={onDrag}
          icon={<IoMdCloudDone size={25}/>}
        />
      </main>
    </div>
  );
};

export default App;
