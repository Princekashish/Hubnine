import React, { useState } from "react";

import "./TaskForm.css";
import Tag from "./Tag";
import { IoIosArrowDropright } from "react-icons/io";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
    setTasks((prev) => {
      return [...prev, taskData];
    });
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };
  return (
    <header className="app_header shadow-white">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Explore"
          onChange={handleChange}
        />
        <button type="submit" className="absolute  ">
          <IoIosArrowDropright size={40} />
        </button>
        <div className="task_form_bottom_line">
          {/* <div>
            <Tag
              tagName="HTML"
              selectTag={selectTag}
              selected={checkTag("HTML")}
            />
            <Tag
              tagName="CSS"
              selectTag={selectTag}
              selected={checkTag("CSS")}
            />
            <Tag
              tagName="JavaScript"
              selectTag={selectTag}
              selected={checkTag("JavaScript")}
            />
            <Tag
              tagName="React"
              selectTag={selectTag}
              selected={checkTag("React")}
            />
          </div> */}

          <div className="w-full  flex justify-center items-center">
            <select
              name="status"
              value={taskData.status}
              className="task_status "
              onChange={handleChange}
            >
              <option value="selected">--Select--</option>
              <option value="todo">Payment panding</option>
              <option value="doing">Payment Completed</option>
            </select>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
