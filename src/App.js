import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState([]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API}&cx=${process.env.REACT_APP_SEARCH}=${term}`
    );
    console.log(response.data.items);
    setSearch(response.data.items);
  };

  const renderSearch = () => {
    return search.map((items) => {
      return (
        <ul>
          <li>
            <a href={items.link} target="new">
              {items.title}
            </a>
          </li>
          <li>{items.snippet}</li>
        </ul>
      );
    });
  };

  return (
    <div className="App">
      <h1>Justin's Search Engine</h1>
      <input type="search" placeholder="search" onChange={handleChange} />
      <form onSubmit={handleSubmit}>
        <button onSubmit={handleSubmit} type="submit">
          Search
        </button>
        <button onSubmit={handleSubmit} type="submit">
          I'm Feeling Lucky
        </button>
      </form>
      {renderSearch()}
    </div>
  );
}

export default App;
