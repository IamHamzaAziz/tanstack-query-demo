import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getData = async (data: string, page: number, limit: number) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/${data}?_page=${page}&_limit=${limit}`
  );
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};

const Pagination = () => {
  const [page, setPage] = useState(1);

  const todos = useQuery({
    queryKey: ["todos", page],
    queryFn: () => getData("todos", page, 10),
    staleTime: 5000,
  });

  if (todos.isLoading) return <div>Loading...</div>;
  if (todos.isError) return <div>Error: {todos.error.message}</div>;

  return (
    <div>
      <h2 className="font-bold text-2xl">Pagination</h2>

      <ul>
        {todos?.data?.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Previous
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
