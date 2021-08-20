import React, { useState } from 'react';
import {
  Container,
  ConteudoForm,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  ButtonInfo,
  AlertSuccess,
  AlertDanger,
  Form,
  Label,
  Input,
  ButtonSuccess,
} from './styles';

import { Link } from 'react-router-dom';

export const Cadastrar = () => {
  const [Produto, setProduto] = useState({
    Nome: '',
    Descricao: '',
  });

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
  });

  const valorInput = (e) =>
    setProduto({ ...Produto, [e.target.name]: e.target.value });

  const cadProduto = async (e) => {
    e.preventDefault(); //Evita carregar a pagina.

    console.log('Teste:', Produto.Nome, '-', Produto.Descricao);

    //const valorJson = JSON.stringify({ Produto });
    const valorJson = { Nome: Produto.Nome, Descricao: Produto.Descricao };

    console.log('valor convertido: ', valorJson);

    await fetch('http://localhost:19631/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        Nome: Produto.Nome,
        Descricao: Produto.Descricao,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('valor cadastrado:', responseJson);
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
      .catch((error) => {
        //console.log(error);

        setStatus({
          type: 'erro',
          mensagem: 'Produto não Cadastrado, tente mais tarde.',
        });
      });
  };

  return (
    <Container>
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Cadastrar</Titulo>
          <BotaoAcao>
            <Link to="/">
              <ButtonInfo>Listar</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>

        {status.type === 'erro' ? <p>{status.mensagem}</p> : ''}
        {status.type === 'sucess' ? (
          <AlertSuccess>{status.mensagem}</AlertSuccess>
        ) : (
          ''
        )}
        <form onSubmit={cadProduto}>
          <Label>Nome: </Label>
          <Input
            type="text"
            name="Nome"
            placeholder="Nome do produto"
            onChange={valorInput}
          />
          <br />
          <br />
          <Label>Descrição: </Label>
          <Input
            type="textArea"
            name="Descricao"
            placeholder="Descrição do produto"
            onChange={valorInput}
          />
          <br />
          <br />
          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
        </form>
      </ConteudoForm>
    </Container>
  );
};
