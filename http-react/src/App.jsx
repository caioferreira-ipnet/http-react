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
  const [count, setCount] = useState(0);

  //Custom Hook
  const { data: items, httpConfig } = useFetch(url);
  //Teste
  useEffect(() => {
    console.log(`O contador mudou para: ${count}`);
    document.title = `Mensagens (${count})`;
  }, [count]);

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
    //Refatorando POST
    httpConfig(product, "POST");

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
