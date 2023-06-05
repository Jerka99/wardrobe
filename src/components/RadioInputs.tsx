const RadioInputs = ({ element, setRadioFun, radio }) => {
  return (
    <>
      <label>
        <input
          type="radio"
          value={element}
          checked={radio == element}
          onChange={(e) => setRadioFun(e.target.value)}
        />
        {element}
      </label>
    </>
  );
};

export default RadioInputs;
