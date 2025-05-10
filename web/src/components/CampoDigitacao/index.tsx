import styled from "styled-components";

const Campo = styled.input`
    background: #F0F0F0;
    margin: 1em 0;
    box-sizing: border-box;
    box-shadow: 2px 2px 6px rgba(0,0,0, 0.25);
    border-radius: 8px;
    border: none;
    width: 100%;
    padding: 16px;
`
interface Props {
    valor: string,
    tipo: string,
    placeholder: string,
    onChange: (value: string) => void;
}

function CampoDigitacao({ valor, tipo , placeholder, onChange} : Props) {
  return (
    <Campo
        type={tipo}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required
        />
  )
}

export default CampoDigitacao