import styled from "styled-components"
import imagemDeFundo from "./ImagemDeFundo.png"
import { Outlet } from "react-router-dom"

const ContainerPrincipal = styled.div`
    background-image: url(${imagemDeFundo});
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url(${imagemDeFundo});
`

const Container = styled.div`
background-color: white;
width: 50vw;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
`

function PaginaBaseFormulario() {
  return (
    <ContainerPrincipal>
        <Container>
                <Outlet />
            </Container>

    </ContainerPrincipal>
  )
}

export default PaginaBaseFormulario