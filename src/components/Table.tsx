import { useState } from "react";
import TableRow from "./TableRow";
import RadioInputs from "./RadioInputs";

const Table = ({ results, myData }) => {

  const [filter, setFilter] = useState("");
  const [radio, setRadio] = useState("");
  const [toggle, setToggle] = useState({});

  const setFilterFun = (e) => {
    setFilter(e.target.value);
    setRadio("");
    setToggle({});
  };

  const setRadioFun = (x) => {
    setRadio(x);
    setToggle({});
  };

  const setToggleFun = (id) => {
    setToggle((prev) => ({ ...prev, [id]: !toggle[id] }));
  };

  return (
    <div id="table-holder">
      <div id="radio">
        <select onChange={setFilterFun} name="" id="">
          <option value="" defaultValue="Filter" hidden>
            Filter
          </option>
          <option value="vrsta">Vrsta</option>
          <option value="velicina">Velicina</option>
        </select>

        <div>
          {" "}
          {filter ? (
            <label>
              <input
                type="radio"
                value=""
                checked={radio == ""}
                onChange={() => {
                  setRadioFun("");
                }}
              />
              Ništa
            </label>
          ) : null}
          {myData[filter]?.map((element) => {
            return (
              <RadioInputs
                key={element}
                element={element}
                setRadioFun={setRadioFun}
                radio={radio}
              />
            );
          })}
        </div>
      </div>
      <div>
        <table
          className={
            Object.values(toggle).some((x) => x == true)
              ? "bigger-table"
              : "smaller-table"
          }
        >
          <thead>
            <tr
              className={
                Object.values(toggle).some((x) => x == true)
                  ? "show-td"
                  : "hide-td"
              }
            >
              <th>Vrsta</th>
              <th>Slika</th>
              <th>Boja</th>
              <th>Velicina</th>
              {Object.values(toggle).some((x) => x == true) ? (
                <th>Datum Kupnje</th>
              ) : null}
              <th>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {radio
              ? results
                  .slice(0)
                  .reverse()
                  .filter((element) => element.odjevniPredmet[filter] == radio)
                  .map((element) => {
                    return (
                      <TableRow
                        key={element.id}
                        rowElement={element}
                        toggle={toggle}
                        setToggleFun={setToggleFun}
                      />
                    );
                  })
              : results
                  .slice(0)
                  .reverse()
                  .map((element) => {
                    return (
                      <TableRow
                        key={element.id}
                        rowElement={element}
                        toggle={toggle}
                        setToggleFun={setToggleFun}
                      />
                    );
                  })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
