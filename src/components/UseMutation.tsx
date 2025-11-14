import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const addUser = (newUser: { name: string }) => {
  const response = axios.post(
    "https://jsonplaceholder.typicode.com/users",
    newUser
  );

  return response;
};

const UseMutation = () => {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      alert("User added successfully");
      // invalidating the query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      alert("User added failed");
    },
    // onSettled is called when the mutation is either successful or failed
    onSettled: (data) => {
      console.log("onSettled", data);
      setName("");
    },
    // onMutate is called when the mutation is about to be executed
    onMutate: (data) => {
      console.log("onMutate", data);
    },
  });

  console.log("mutation", mutation);

  if (mutation.isPending) return <div>Loading...</div>;

  if (mutation.isError) return <div>Error: {mutation.error.message}</div>;

  return (
    <div>
      <h2 className="font-bold text-2xl">UseMutation</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      />
      <button
        onClick={() => mutation.mutate({ name })}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Create User
      </button>
    </div>
  );
};

export default UseMutation;
