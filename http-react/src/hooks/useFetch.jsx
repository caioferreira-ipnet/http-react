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

  const [data, setData] = useState(null);

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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    if (method === "POST") {
      const httpRequest = async () => {
        const res = await fetch(url, config);
        const json = await res.json();
        setCallFetch(json);
      };
      httpRequest();
    }
  }, [config, method, url]);
  return { data, httpConfig };
};
