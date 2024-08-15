import { IoMdAdd } from "react-icons/io";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDropright } from "react-icons/io";

export default function Canvas() {
  const [data, setData] = useState([]); // Stores all cards
  const [dummytext, setDummytext] = useState(false); // Toggle textarea visibility
  const [inputText, setInputText] = useState(""); // Stores textarea input
  const canvasRef = useRef(null);

  const toggle = () => {
    setDummytext(!dummytext);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value); // Update state with textarea value
  };

  const addData = () => {
    if (inputText.trim()) {
      // Only add card if there's text
      const newData = {
        id: `card-${data.length + 1}`, // Unique ID for each card
        text: inputText, // Use the input text
        showMore: false, // Track the "Show More" state for each card
      };
      setData((prevData) => [...prevData, newData]); // Add new card to data array
      setInputText(""); // Clear the textarea
      setDummytext(false); // Hide textarea
    }
  };

  const toggleShowMore = (index) => {
    // Toggle "Show More" state for the clicked card
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, showMore: !item.showMore } : item
      )
    );
  };

  return (
    <div ref={canvasRef} className="bg-zinc-800 min-h-screen overflow-hidden">
      <h1 className="text-zinc-900 leading-none text-[13vw] font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Hubnine.
      </h1>
      <div onClick={toggle} className="text-[#F6F6F6] p-10 z-20">
        <IoMdAdd
          onClick={toggle}
          size={35}
          className={`border-2 rounded-full cursor-pointer  ${
            dummytext ? "rotate-45" : ""
          }`}
        />
      </div>

      {/* Textarea for input */}
      <div className={`${dummytext ? "absolute left-24" : "hidden"}`}>
        <textarea
          name="text"
          id="text"
          value={inputText}
          onChange={handleInputChange} // Handle input change
          className="bg-zinc-500  h-44 rounded-2xl outline-none text-white p-5 py-8 overflow-y-visible"
        />
        <button
          onClick={addData} // Add card on button click
          className="text-white px-4 py-2 mt-2 absolute rounded-full right-0 bottom-0"
        >
          <IoIosArrowDropright size={35} />
        </button>
      </div>

      {/* Render draggable and resizable cards */}
      <div className="p-10 relative flex justify-center items-center">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className={`bg-zinc-700 text-[#F6F6F6] p-4 rounded-3xl shadow-md my-4 absolute flex justify-center items-center text-center ${
              item.showMore ? "w-80 h-auto" : "w-48 h-24"
            }`}
            drag
            dragConstraints={canvasRef}
            whileDrag={{ scale: 1.1 }}
          >
            <div>
              <p>
                {item.showMore
                  ? item.text
                  : item.text.length > 8
                  ? `${item.text.substring(0, 8)}...`
                  : item.text}
              </p>
              {/* Show "See More" button if text is longer than 8 characters */}
              {item.text.length > 8 && (
                <button
                  onClick={() => toggleShowMore(index)}
                  className="text-blue-500 underline mt-2"
                >
                  {item.showMore ? "See Less" : "See More"}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
