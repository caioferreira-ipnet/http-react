import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import "./App.css";

const url = "http://localhost:3001/products";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { data: items, httpConfig, loading, errors } = useFetch(url);

  const addProduct = async (product) => {
    httpConfig(product, "POST");
    setName("");
    setPrice("");
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || price.trim() === "") {
      return;
    } else {
      const product = {
        name,
        price,
      };
      // 'void' indica explicitamente que a Promise da função async não precisa ser aguardada aqui
      void addProduct(product);
    }
  }

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {/*Loading data */}
      {loading && <p>Loading...</p>}
      {errors && <p>{errors}</p>}
      {!loading && (
        <ul>
          {/* Uso do optional chaining (?.) para eliminar o warning */}
          {items?.map((product) => (
            <li key={product.id}>
              {product.name} - R$ {product.price}
            </li>
          ))}
        </ul>
      )}

      <div className="form-add-product">
        <h2>Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          {/* Formatação dos inputs mantendo o texto e input na mesma linha/bloco sem ambiguidades */}
          <label>
            Nome:{""}
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            {/* Formatação dos inputs mantendo o texto e input na mesma linha/bloco sem ambiguidades */}
            Preço:{""}
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          {/*Loading no POST */}
          {loading && <input type="submit" value="Aguarde" disabled />}

          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
