import { Box, Checkbox, FormControlLabel, FormGroup, Modal, Switch } from "@mui/material";
import Titulo from "../../../components/Titulo";
import styled from "styled-components";
import { useState } from "react";
import CampoDigitacao from "../../../components/CampoDigitacao";
import Subtitulo from "../../../components/Subtitulo";
import Botao from "../../../components/Botao";
import IProfissional from "../../../types/IProfissional";
import autenticaStore from "../../../stores/autentica.store";
import usePost from "../../../usePost";

const BoxCustomizado = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--branco);
  border: none;
  border-radius: 16px;
  padding: 1em 5em;
`;

const Container = styled.div`
text-align: left;
`

const ContainerSwitch = styled.div`
text-align: center;
`

const TextoSwitch = styled.p`
color: var(--cinza);
`

const BotaoCustomizado = styled(Botao)`
    width: 50%;
    display: block;
    margin: 0 auto;
`

const ContainerEndereco = styled.div`
display: grid;
grid-template-columns: 2fr 1fr;
grid-gap: 0 1em;
`

export default function ModalCadastro({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const [planosSelecionados, setPlanosSelecionados] = useState<string[]>([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaVerificada, setSenhaVerificada] = useState("");
    const [possuiPlano, setPossuiPlano] = useState(false);
    const [imagem, setImagem] = useState('');
    const [especialidade, setEspecialidade] = useState("");
    const [crm, setCrm] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [estado, setEstado] = useState("");
    const [telefone, setTelefone] = useState("");
    const label = { inputProps: { 'aria-label': 'Atende por plano?' } };
    const {cadastrarDados} = usePost();
    const {usuario} = autenticaStore;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setPlanosSelecionados([...planosSelecionados, checkboxValue]);
        } else {
            setPlanosSelecionados(planosSelecionados.filter(plano => plano !== checkboxValue));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const profissional: IProfissional = {
            nome: nome,
            crm: crm,
            especialidade: especialidade,
            possuiPlanoSaude: possuiPlano,
            estaAtivo: true,
            imagem: imagem,
            senha: senha,
            planoSaude: planosSelecionados,
            email: email,
            telefone: telefone,
            endereco: {
                cep: cep,
                rua: rua,
                estado: estado,
                numero: numero,
                complemento: complemento
            }
        }

        await cadastrarDados({url: "especialista", dados: profissional, token: usuario.token})
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BoxCustomizado>
                    <Titulo>Cadastre o especialista inserindo os dados abaixo:</Titulo>
                    <form onSubmit={handleSubmit}>
                        <Container>
                            <CampoDigitacao tipo="text" label="Nome" valor={nome} placeholder="Digite seu nome completo" onChange={setNome} />
                            <CampoDigitacao tipo="email" label="Email" valor={email} placeholder="Digite seu email" onChange={setEmail} />
                            <CampoDigitacao tipo="password" label="Senha" valor={senha} placeholder="Digite sua senha" onChange={setSenha} />
                            <CampoDigitacao tipo="password" label="Repita a senha" valor={senhaVerificada} placeholder="Digite sua senha novamente" onChange={setSenhaVerificada} />
                            <CampoDigitacao tipo="text" label="Especialidade" valor={especialidade} placeholder="Qual sua especialidade?" onChange={setEspecialidade} />
                            <CampoDigitacao tipo="number" label="CRM" valor={crm} placeholder="Insira seu número de registro" onChange={setCrm} />
                            <CampoDigitacao tipo="tel" label="Telefone" valor={telefone} placeholder="(DDD) XXXXX-XXXX" onChange={setTelefone} />
                            <CampoDigitacao tipo="text" label="Insira a URL da sua imagem" valor={imagem} placeholder="https://img.com/fotos/retrato-de-um-jovem-medico" onChange={setImagem} />

                            <CampoDigitacao
                                tipo="number"
                                label="Endereço"
                                valor={cep}
                                placeholder="Insira o CEP"
                                onChange={setCep}
                            />
                            <ContainerEndereco>
                                <CampoDigitacao
                                    tipo="text"
                                    valor={rua}
                                    placeholder="Rua"
                                    onChange={setRua}
                                />
                                <CampoDigitacao
                                    tipo="number"
                                    valor={numero}
                                    placeholder="Número"
                                    onChange={setNumero}
                                />
                                <CampoDigitacao
                                    tipo="text"
                                    valor={complemento}
                                    placeholder="Complemento"
                                    onChange={setComplemento}
                                />
                                <CampoDigitacao
                                    tipo="text"
                                    valor={estado}
                                    placeholder="Estado"
                                    onChange={setEstado}
                                />
                            </ContainerEndereco>
                        </Container>

                        <ContainerSwitch>
                            <Subtitulo>Atende por plano?</Subtitulo>
                            <Switch {...label} onChange={() => {
                                possuiPlano ?
                                    setPossuiPlano(false) :
                                    setPossuiPlano(true)
                            }
                            } />
                            <TextoSwitch>Não/Sim</TextoSwitch>
                        </ContainerSwitch>
                        {possuiPlano ?
                            <>
                                <Subtitulo>Selecione os planos:</Subtitulo>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Sulamerica" />} label="Sulamerica" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Unimed" />} label="Unimed" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Bradesco" />} label="Bradesco" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Amil" />} label="Amil" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Biosaúde" />} label="Biosaúde" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Biovida" />} label="Biovida" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Outro" />} label="Outro" />
                                </FormGroup>
                            </>
                            : ''}
                        <BotaoCustomizado>Cadastrar</BotaoCustomizado>
                    </form>
                </BoxCustomizado>
            </Modal >
        </>
    );
}