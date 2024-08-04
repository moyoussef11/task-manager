import { memo } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Task = ({ name, id, completed }) => {
  // handle delete icon
  async function deleteTask(id) {
    try {
      axios.delete(`http://localhost:3010/api/tasks/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      key={id}
      className="bg-white py-3 px-14 w-full md:w-1/2 flex justify-between items-center rounded shadow"
    >
      <div className="flex items-center justify-center gap-2 ">
        {completed ? (
          <FaCheckCircle className="cursor-pointer text-green-500" />
        ) : (
          <FaCheckCircle className="cursor-pointer hover:text-green-500" />
        )}
        {completed ? (
          <h5 className="capitalize line-through">{name}</h5>
        ) : (
          <h5 className="capitalize">{name}</h5>
        )}
      </div>
      <div className="flex gap-2">
        <MdDelete
          onClick={() => deleteTask(id)}
          className="cursor-pointer hover:text-red-500"
        />
        <Link to={`edittask/${id}`}>
          <BiSolidEdit className="cursor-pointer hover:text-yellow-500" />
        </Link>
      </div>
    </div>
  );
};

export default memo(Task);
