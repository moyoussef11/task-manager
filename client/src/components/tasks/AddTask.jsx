import axios from "axios";
import { useState } from "react";

const AddTask = () => {
  const [name, setName] = useState("");
  const [add, setAdd] = useState(false);
  //Handle submit form
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3010/api/tasks", {
        name,
      });
      if (res.statusText === "Created") {
        setAdd(true);
        //  timer to hide the message
        setTimeout(() => {
          setAdd(false);
        }, 3000);
        setName("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" flex flex-col items-center gap-5 bg-white h-fit py-7 px-16 w-full md:w-1/2 rounded shadow mb-20">
      <h3 className="capitalize font-semibold">Task Manager</h3>
      <form
        onSubmit={submit}
        className="relative w-full flex items-center justify-center"
      >
        <input
          type="text"
          placeholder="e.g. wash dishes"
          className="w-full bg-slate-200 rounded p-2 placeholder:capitalize focus:outline-none"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
      {add ? (
        <span className="bg-green-400 p-2 text-white capitalize rounded">
          Created successfully
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddTask;
