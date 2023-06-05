const FormSelect = (props) => {
  const { data, inputsFunction, ...rest } = props;

  return (
    <select {...rest} onChange={inputsFunction}>
      <option value="">{rest.name}</option>
      {data.map((element) => (
        <option key={element} value={element}>
          {element}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
