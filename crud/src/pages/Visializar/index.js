import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonInfo,
  Titulo,
  ConteudoProd,
} from './styles';

export const Visualizar = (props) => {
  // Pegando o valor que vem da url.
  const [id] = useState(props.match.params.id);

  const [data, setData] = useState([]);

  //Carrega antes da pagina,sempre bota um array[], para evitar o loot infinito!
  useEffect(() => {
    const getProduto = async () => {
      await fetch('http://localhost:19631/api/produtos/' + id)
        .then((response) => response.json())
        .then((responseJson) => setData(responseJson));
    };
    getProduto();
  }, [id]);

  return (
    <>
      <Container>
        <ConteudoTitulo>
          <Titulo>Visualizar</Titulo>
          <BotaoAcao>
            <Link to="/">
              <ButtonInfo>Listar</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>
        <ConteudoProd>ID: {data.id}</ConteudoProd>
        <ConteudoProd>Título: {data.nome}</ConteudoProd>
        <ConteudoProd>Descrição: {data.descricao}</ConteudoProd>
      </Container>
    </>
  );
};
