import { useState, useEffect, useCallback } from "react";

import "./App.css";

//URL base da API
const url = "http://localhost:3001/products";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1- Resgatando dados da API
  const getData = useCallback(async () => {
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  console.log(products);

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

    // Atualizando a lista de produtos
    getData();
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((product) => (
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
