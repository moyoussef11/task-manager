import AddTask from "../components/tasks/AddTask";
import Tasks from "../components/tasks/Tasks";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-5  min-h-screen bg-slate-200 py-10">
      <AddTask />
      <Tasks />
    </div>
  );
};

export default Home;
