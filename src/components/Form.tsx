import { useState } from "react";
import FormInputs from "./FormInputs";
import FormSelect from "./FormSelect";
import obradiPodatke from "../functions/obradiPodatke.js";
import axios from "axios";

const Form = (props) => {
  const myData = props.myData;

  const [input, setInput] = useState({
    vrsta: "",
    boja: "",
    velicina: "",
    datum: "",
  });

  const inputsFunction = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const inputObjects = [
    {
      name: "datum",
      type: "date",
      value: input.datum,
      required: true,
    },
    {
      name: "boja",
      type: "color",
      value: input.boja,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({
      vrsta: "",
      boja: "",
      velicina: "",
      datum: "",
    })
    const dataForPost = obradiPodatke(input);
    axios
      .post("http://localhost:3001/odjeca", dataForPost)
      .then((rez) =>
        axios
          .get("http://localhost:3001/odjeca")
          .then((rez) => props.setResults(rez.data))
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputObjects.map((element) => {
        return (
          <FormInputs
            key={element.name}
            {...element}
            inputsFunction={inputsFunction}
          />
        );
      })}

      {Object.keys(myData).map((element) => {
        return (
          <FormSelect
            key={element}
            name={element}
            data={myData[element]}
            value={input[element]}
            required={true}
            inputsFunction={inputsFunction}
          />
        );
      })}
      <img src={input.vrsta ? `./${input.vrsta}.jpg` : `./preuzmi.jpg`} alt="" />

      <button type="submit">Posalji</button>
    </form>
  );
};

export default Form;
