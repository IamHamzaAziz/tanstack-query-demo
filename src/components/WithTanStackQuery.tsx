import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (response.status != 200) {
    throw new Error("Failed to fetch users data");
  }
  return response.data;
}

const WithTanStackQuery = () => {
  //   const data = useQuery({
  //     queryKey: ["todos"],
  //     queryFn: getUsers,
  //   });
  //   console.log(data);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 1000, // Data stays "fresh" for 5 seconds. During this time, useQuery won't refetch if the same queryKey is used
    refetchInterval: 10 * 1000, // time after which data will be fetched again without any manual intervention
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="font-bold">With TanStack Query</h2>
      <ul>
        {data?.map((todo: any) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WithTanStackQuery;
