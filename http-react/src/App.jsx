import { useState, useEffect, useCallback } from "react";
//Custom hook
import { useFetch } from "./hooks/useFetch";
import "./App.css";

//Refatorando o POST

//URL base da API
const url = "http://localhost:3001/products";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  //Refatorando o POST
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  //Custom Hook
  const { data: items } = useFetch(url);

  // 1- Resgatando dados da API
  const getData = useCallback(async () => {
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  }, []);

  // Adicionando Itens na lista de produtos

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;

    const product = {
      name,
      price,
    };

    addProduct(product);
  }

  const addProduct = async (product) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    // Carregamento dinâmico de dados
    const addedProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addedProduct]);
    setName("");
    setPrice("");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {items &&
          items.map((product) => (
            <li key={product.id}>
              {product.name} - R$ {product.price}
            </li>
          ))}
      </ul>
      <div className="form-add-product">
        <h2>Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button type="submit" value="Adicionar">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
