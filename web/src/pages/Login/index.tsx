import { useState } from "react"
import CampoDigitacao from "../../components/CampoDigitacao"

function Login() {
    const [email, setEmail] = useState('');
  return (
    <>
        <CampoDigitacao 
            valor={email} 
            tipo="text" 
            placeholder="Insira seu endereço de e-mail" 
            onChange={setEmail}
            labelx="Email"
        />
    </>
  )
}

export default Login