import { useState, useEffect } from "react";

export const useFetch = (url) => {
  //Refatorando o POST
  // Vai configurar o metódo que vai ser utilizado, headers, body também
  const [config, setConfig] = useState(null);

  //Vai setar qual método vai ser utilizado na função, se é GET ou POST
  const [method, setMethod] = useState(null);

  //Vai entrar junto do parâmetro do useEffect
  //Para que ele seja executado quando o método for alterado
  const [callFetch, setCallFetch] = useState(false);

  //Loading
  const [loading, setLoading] = useState(false);

  //Tratando erros
  const [errors, setErrors] = useState(null);
  const [itemsId, setItemsId] = useState(null);
  const [data, setData] = useState(null);

  //Configurar POST/Requisições gerais
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

  //Method GET
  useEffect(() => {
    void (async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error.message);
        setErrors("Erro ao carregar dados!");
      } finally {
        setLoading(false);
      }
    })();
  }, [url, callFetch]);

  //Method POST
  useEffect(() => {
    if (method === "POST") {
      void (async () => {
        try {
          const res = await fetch(url, config);
          const json = await res.json();
          setCallFetch(json);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      })();
    } else if (method === "DELETE") {
      void (async () => {
        const deleteUrl = `${url}/${itemsId}`;
        const res = await fetch(deleteUrl, config);
        const json = await res.json();
        setCallFetch(json);
      })();
    }
  }, [config, method, url, itemsId]);
  return { data, httpConfig, loading, errors };
};
