import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../constants";
import { Product } from "../interface";

export default function useFetch(
  { query }: { query: string | null | undefined } = { query: null }
) {
  const [data, setData] = useState<{ products: Product[] }>({ products: [] });
  const [loads, setLoads] = useState(false);
  // TODO: ensure type safety
  const [error, setError] = useState<any>(null);

  const fetchDataAsync = async () => {
    setLoads(true);
    try {
      const url = query
        ? `${SERVER_ENDPOINT}/api/product/search/${query}`
        : `${SERVER_ENDPOINT}/api/product`;
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoads(false);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const refetch = () => {
    setLoads(true);
    fetchDataAsync();
  };
  return { data, loads, error, refetch };
}
