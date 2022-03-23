import { GetServerSideProps } from "next";
import { useState } from "react";
import { getAllTodos, Todo } from "../lib/db";

export const getServerSideProps: GetServerSideProps = async () => {
  const todos = await getAllTodos();
  return {
    props: {
      todos,
    },
  };
};

interface PostProps {
  todos: Todo[];
}

const Home = ({ todos }: PostProps) => {
  const [description, setDescription] = useState("");

  const handleClick = async () => {
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(description),
    });
  };

  return (
    <div className="h-screen bg-gray-500">
      <nav className="flex justify-center p-4 bg-gray-600">
        <h1 className="text-white text-2xl font-bold">Todo App</h1>
      </nav>
      <div>
        <form className="flex justify-center mt-10">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h1 className="text-center mb-4">Write Todo List</h1>
            <div className="flex space-x-2 p-2 bg-white rounded-md">
              <input
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                type="text"
                placeholder="Write here..."
                className="w-full outline-none"
              />
              <button
                className="bg-green-500 px-2 py-1 rounded-md text-white font-semibold"
                onClick={() => handleClick()}
              >
                send
              </button>
            </div>
          </div>
        </form>
        <div>
          {todos?.map((item, index) => (
            <div key={item.id} className="flex justify-center">
              <div className=" relative justify-center mt-6">
                <div className="absolute flex top-0 right-0 p-3 space-x-1">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </span>
                </div>
                <span className="absolute -left-3 -top-3 bg-green-500 flex justify-center items-center rounded-full w-8 h-8 text-gray-50 font-bold">
                  {index + 1}
                </span>
                <p className="bg-white px-12 py-8 rounded-lg w-80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
