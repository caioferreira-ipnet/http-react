import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [itemsId, setItemsId] = useState(null);

  // Configura as opções da requisição de acordo com o método
  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      });
      setMethod(method);
      setItemsId(data);
    }
  };

  // 1. Método GET (Executa ao montar ou ao mudar callFetch)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setErrors(null);
      } catch (error) {
        console.log(error.message);
        setErrors("Erro ao carregar dados!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, callFetch]);

  // 2. Métodos POST e DELETE
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        try {
          setLoading(true);
          const res = await fetch(url, config);
          const json = await res.json();
          setCallFetch(json); // Dispara atualização da lista
        } catch (error) {
          console.error("Error posting data:", error);
          setErrors("Erro ao enviar dados!");
        } finally {
          setLoading(false);
        }
      } else if (method === "DELETE") {
        try {
          setLoading(true);
          const deleteUrl = `${url}/${itemsId}`;
          const res = await fetch(deleteUrl, config);
          const json = await res.json();
          setCallFetch(json); // Dispara atualização da lista
        } catch (error) {
          console.error("Error deleting data:", error);
          setErrors("Erro ao remover dados!");
        } finally {
          setLoading(false);
        }
      }
    };

    if (method) {
      httpRequest();
    }
  }, [config, method, url, itemsId]);

  // Retorno principal do hook (agora fora do httpConfig)
  return { data, httpConfig, loading, errors };
};
