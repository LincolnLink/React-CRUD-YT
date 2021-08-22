import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  ConteudoForm,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  ButtonInfo,
  Form,
  Label,
  Input,
  AlertSuccess,
  AlertDanger,
  ButtonWarning,
} from './styles';

export const Editar = (props) => {
  // Pegando o valor que vem da url.
  const [id] = useState(props.match.params.id);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
  });

  //Carrega antes da pagina,sempre bota um array[], para evitar o loot infinito!
  useEffect(() => {
    const getProduto = async () => {
      await fetch('http://localhost:19631/api/produtos/' + id)
        .then((response) => response.json())
        .then((responseJson) => {
          setNome(responseJson.nome);
          setDescricao(responseJson.descricao);
        });
    };
    getProduto();
  }, [id]);

  const editProduto = async (e) => {
    //método que não deixa carregar a pagina.
    //http://localhost:19631/api/produtos/adc308f8-8f1e-4b1d-b3e7-2f71086f6443
    e.preventDefault();

    await fetch('http://localhost:19631/api/produtos/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: id,
        Nome: nome,
        Descricao: descricao,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.success) {
          setStatus({
            type: 'erro',
            mensagem: responseJson.errors,
          });
        } else {
          setStatus({
            type: 'sucess',
            mensagem: 'Salvo com Sucesso',
          });
        }
      })
      .catch(() => {
        setStatus({
          type: 'erro',
          mensagem: 'Produto não editado com sucesso, tente mais tarde!',
        });
      });
  };

  return (
    <Container>
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Editar</Titulo>
          <BotaoAcao>
            <Link to="/">
              <ButtonInfo>Listar</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>

        {status.type === 'erro' ? (
          <AlertDanger>{status.mensagem}</AlertDanger>
        ) : (
          ''
        )}
        {status.type === 'sucess' ? (
          <AlertSuccess>{status.mensagem}</AlertSuccess>
        ) : (
          ''
        )}

        <Form onSubmit={editProduto}>
          <Label>Nome: </Label>
          <Input
            type="text"
            name="Nome"
            value={nome}
            placeholder="Nome do produto"
            onChange={(e) => setNome(e.target.value)}
          />

          <Label>Descrição: </Label>
          <Input
            type="textArea"
            name="Descricao"
            value={descricao}
            placeholder="Descrição do produto"
            onChange={(e) => setDescricao(e.target.value)}
          />

          <ButtonWarning type="submit">Editar</ButtonWarning>
        </Form>
      </ConteudoForm>
    </Container>
  );
};
