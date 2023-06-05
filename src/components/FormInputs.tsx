
const FormInputs = (props) => {
    const {inputsFunction, ...rest} = props

    return (
    <input {...rest} onChange={inputsFunction}/>
    )
}

export default FormInputs
