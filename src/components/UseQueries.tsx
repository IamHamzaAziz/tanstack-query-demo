import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const getData = async (data: string) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/${data}`
  );
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};

const UseQueries = () => {
  // rather than using useQuery for each query separately, we can use useQueries to fetch multiple queries at once
  const data = useQueries({
    queries: [
      {
        queryKey: ["users"],
        queryFn: () => getData("users"),
        staleTime: 5 * 1000,
      },
      { queryKey: ["posts"], queryFn: () => getData("posts") },
    ],
  });

  // if (data[0].isLoading) return <div>Loading Users...</div>;
  // if (data[1].isLoading) return <div>Loading Posts...</div>;

  // if (data[0].isError) return <div>Error fetching Users...</div>;
  // if (data[1].isError) return <div>Error fetching Posts...</div>;

  // we can destructure the data array to get the data for each query
  const [users, posts] = data;

  if (users.isLoading) return <div>Loading Users...</div>;
  if (posts.isLoading) return <div>Loading Posts...</div>;

  if (users.isError) return <div>Error fetching Users...</div>;
  if (posts.isError) return <div>Error fetching Posts...</div>;

  return (
    <div>
      <h2 className="font-bold text-2xl">UseQueries</h2>

      <h3 className="font-bold text-xl">Users</h3>
      <ul>
        {users?.data?.map((todo: any) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>

      <h3 className="font-bold text-xl">Posts</h3>
      <ul>
        {posts?.data?.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UseQueries;
