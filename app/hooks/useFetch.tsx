import { useState, useEffect } from "react";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setPending] = useState<boolean>(false);
  const [isError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      setError(null);

      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const req = await fetch(url, { signal });

        if (!req.ok) {
          throw new Error(`HTTP error! Status: ${req.status}`);
        }

        const result: T = await req.json();
        setData(result);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, isError };
};

export default useFetch;
