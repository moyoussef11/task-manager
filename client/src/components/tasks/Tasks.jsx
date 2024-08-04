import { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  // fetch all tasks
  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3010/api/tasks");
      setTasks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTasks();
  }, [tasks]);

  // render UI

  const showData = tasks.map((task, index) => (
    <Task
      key={index}
      name={task.name}
      completed={task.completed}
      id={task._id}
    />
  ));

  return (
    <>
      {tasks.length <= 0 ? (
        <div className="bg-white p-4 rounded">
          <p className="capitalize text-3xl font-bold">
            no tasks enjoy or add task
          </p>
        </div>
      ) : (
        showData
      )}
    </>
  );
};

export default Tasks;
