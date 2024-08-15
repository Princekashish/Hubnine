import React from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import { MdDeleteForever } from "react-icons/md";

const TaskCard = ({ title, tags, handleDelete, index, setActivecard }) => {
    return (
        <article
            className='task_card'
            draggable
            onDragStart={() => setActivecard(index)}
            onDragEnd={() => setActivecard(null)}
        >
            <p className='task_text'>{title}</p>

            <div className='task_card_bottom_line'>
                <div className='task_card_tags'>
                    {tags.map((tag, index) => (
                        <Tag key={index} tagName={tag} selected />
                    ))}
                </div>
                <div
                    className=''
                    onClick={() => handleDelete(index)}
                >
                    <MdDeleteForever size={25}/>
                </div>
            </div>
        </article>
    );
};

export default TaskCard;
