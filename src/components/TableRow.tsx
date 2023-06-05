import { useContext, useState } from "react";
import FunRef from "../functions/contexts.js";
import obradiPodatke from "../functions/obradiPodatke.js";
import axios from "axios";

const TableRow = ({ rowElement, toggle, setToggleFun }) => {
  const [editButton, setEditButton] = useState(true);
  const { vrsta, boja, velicina } = rowElement.odjevniPredmet;
  const [parameters, setParameters] = useState({
    vrsta: vrsta,
    boja: boja,
    velicina: velicina,
    datum: rowElement.datumKupnje.datum,
  });
  const boolean = Object.values(toggle).some((x) => x == true);

  const context = useContext(FunRef);

  const deleteRow = async (el) => {
    var r = confirm("Jeste sigurni da želite izbrisati");
    if (r == true) {
      await axios.delete(`http://localhost:3001/odjeca/${el.id}`);
      context.setResults((inputs) => inputs.filter((x) => x.id != el.id));
    }
  };

  const changeRow = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  const sendChange = async (re) => {
    setEditButton(true);

    const newObj = obradiPodatke({ ...parameters }, re.id);

    const res = await axios.put(
      `http://localhost:3001/odjeca/${re.id}`,
      newObj
    );

    context.setResults((inputs) =>
      inputs.map((x) => {
        if (x.id == re.id) {
          return newObj;
        }
        return x;
      })
    );
  };

  return (
    <>
      {editButton ? (
        <tr
          className={
            boolean ? `show-td ${toggle[rowElement.id] ?? false}` : "hide-td"
          }
        >
          <td>
            <p>{parameters.vrsta}</p>
          </td>
          <td>
            <img
              src={parameters.vrsta ? `./${parameters.vrsta}.jpg` : undefined}
              alt=""
            />
          </td>
          <td>
            <input type="color" disabled={true} value={parameters.boja} />
          </td>
          <td>
            <p>{parameters.velicina}</p>
          </td>
          {boolean && (
            <td>{toggle[rowElement.id] && <p>{parameters.datum}</p>}</td>
          )}
          <td>
            <button style={toggle[rowElement.id] ? { background: "grey" } :
             { background: "" }}onClick={() => setToggleFun(rowElement.id)}
            >Detalji</button>
            <button onClick={() => setEditButton((prev) => !prev)}>Uredi</button>
            <button onClick={() => deleteRow(rowElement)}>X</button>
          </td>
        </tr>
      ) : (
        <tr
          className={boolean ? `show-td ${toggle[rowElement.id]}` : "hide-td"}
        >
          <td>
            <select
              name="vrsta"
              value={parameters.vrsta}
              onChange={(e) => changeRow(e)}
            >
              {context.myData.vrsta.map((element) => {
                return (
                  <option key={element} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
          </td>
          <td>
            <img
              src={parameters.vrsta ? `./${parameters.vrsta}.jpg` : undefined}
              alt=""
            />
          </td>
          <td>
            <input
              name="boja"
              type="color"
              onChange={(e) => changeRow(e)}
              value={parameters.boja}
            />
          </td>
          <td>
            <select
              name="velicina"
              value={parameters.velicina}
              onChange={(e) => changeRow(e)}
            >
              {context.myData.velicina.map((element) => {
                return (
                  <option key={element} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
          </td>
          {boolean && (
            <td>
              {toggle[rowElement.id] && (
                <input
                  name="datum"
                  onChange={(e) => changeRow(e)}
                  type="date"
                  value={parameters.datum}
                />
              )}
            </td>
          )}
          <td>
            <button style={toggle[rowElement.id] ? { background: "grey" }:
             { background: "" }}onClick={() => setToggleFun(rowElement.id)}>Detalji</button>
            <button style={!editButton ? { background: "grey" } :
             { background: "default" }}onClick={(e) => sendChange(rowElement)}>Spremi</button>
            <button onClick={() => deleteRow(rowElement)}>X</button>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
