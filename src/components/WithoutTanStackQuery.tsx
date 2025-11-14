import { useEffect, useState } from "react";
import axios from "axios";

const WithoutTanstackQuery = () => {
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleFetch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${id}`
        );
        setData(result.data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetch();
  }, [id]);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1 className="text-red-400">{error}</h1>}
      {data && <h1>{JSON.stringify(data)}</h1>}
      <button onClick={() => setId((prevId) => prevId + 1)}>Next</button>
    </div>
  );
};

export default WithoutTanstackQuery;
