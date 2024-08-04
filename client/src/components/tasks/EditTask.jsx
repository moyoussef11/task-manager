import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const [task, setTask] = useState({});
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();

  const getTask = async () => {
    try {
      const res = await axios.get(`http://localhost:3010/api/tasks/${id}`);
      setTask(res.data.data);
      setName(res.data.data.name || "");
      setCompleted(res.data.data.completed || false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCompletedChange = (e) => {
    setCompleted(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3010/api/tasks/${id}`, {
        name,
        completed,
      });
      console.log("Task updated successfully!");
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center bg-slate-200 h-screen py-20">
      <div className="bg-white w-full md:w-1/3 h-fit p-8 shadow">
        <h3 className="text-center capitalize font-semibold mb-2">edit task</h3>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <label className="w-1/4 capitalize font-semibold" htmlFor="id">
              task ID
            </label>
            <input
              className="w-full py-1 px-2 focus:outline-none"
              type="text"
              placeholder={task._id}
              readOnly
              name="_id"
            />
          </div>
          <div className="flex">
            <label className="w-1/4 capitalize font-semibold" htmlFor="name">
              name
            </label>
            <input
              className="w-full py-1 px-2 bg-slate-200"
              type="text"
              placeholder="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex gap-5">
            <label className="capitalize font-semibold" htmlFor="completed">
              completed
            </label>
            <input
              type="checkbox"
              name="completed"
              id="completed"
              checked={completed}
              onChange={handleCompletedChange}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-200 hover:text-green-500 duration-300 text-white p-1 w-full rounded capitalize"
          >
            edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
