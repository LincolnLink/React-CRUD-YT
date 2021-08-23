import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonSuccess,
  ButtonPrimary,
  ButtonWarning,
  ButtonDanger,
  AlertDanger,
  AlertSuccess,
  Table,
  Titulo,
} from './styles';

export const Home = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
  });

  const getProdutos = async () => {
    fetch('http://localhost:19631/api/produtos')
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson));
  };

  const apagarProduto = (id) => {
    fetch('http://localhost:19631/api/produtos/' + id, {
      method: 'DELETE',
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
            mensagem: 'Deletado com Sucesso',
          });
          getProdutos();
        }
      })
      .catch(() => {
        setStatus({
          type: 'erro',
          mensagem: 'Produto não apagado com sucesso, tente mais tarde!',
        });
      });
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Listar</Titulo>
        <BotaoAcao>
          <Link to="/cadastrar">
            <ButtonSuccess>Cadastrar</ButtonSuccess>
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

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>
                <Link to={'/visualizar/' + produto.id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>{' '}
                <Link to={'/editar/' + produto.id}>
                  <ButtonWarning>Editar</ButtonWarning>
                </Link>{' '}
                <Link to="#" onClick={() => apagarProduto(produto.id)}>
                  <ButtonDanger>Apagar</ButtonDanger>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
