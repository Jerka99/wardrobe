import { useEffect, useState } from "react";
import "./App.css";
import FunRef from "./functions/contexts.js";
import axios from "axios";
import Table from "./components/Table";
import Form from "./components/Form";

function App() {
  const [results, setResults] = useState([]);
  const [myData, setMyData] = useState({ vrsta: [], velicina: [] });

  useEffect(() => {
    axios
      .get("http://localhost:3001/odjeca")
      .then((data) => setResults(data.data));
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/vrsta"),
      axios.get("http://localhost:3001/velicina"),
    ]).then(([vrsta, velicina]) => {
      setMyData((prev) => ({
        ...prev,
        vrsta: vrsta.data,
        velicina: velicina.data,
      }));
    });
  }, []);

  return (
    <div className="App">
      <FunRef.Provider value={{ setResults, myData }}>
        <Table results={results} myData={myData} />
      </FunRef.Provider>
      <Form setResults={setResults} myData={myData} />
    </div>
  );
}

export default App;
