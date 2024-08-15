import React from "react";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({ title, icon, tasks, status, handleDelete, setActivecard, onDrag }) => {
    return (
        <section className='task_column'>
           <h2 className='flex justify-center items-center gap-5'>
                {icon}
                {title}
            </h2>

            {/* Drop area at the top */}
            <DropArea onDrop={() => onDrag(status, 0)} />

            {tasks.map((task, index) =>
                task.status === status && (
                    <div key={index}>
                        <TaskCard
                            title={task.task}
                            tags={task.tags}
                            handleDelete={() => handleDelete(index)}
                            index={index}
                            setActivecard={() => setActivecard(index)}
                        />
                        <DropArea onDrop={() => onDrag(status, index + 1)} />
                    </div>
                )
            )}
        </section>
    );
};

export default TaskColumn;
