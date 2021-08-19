import React, { useEffect } from 'react';
import { useState } from 'react';

import { Table, Titulo } from './styles';

export const Home = () => {
  const [data, setData] = useState([]);

  const getProdutos = async () => {
    fetch('http://localhost:58138/api/Products')
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson));
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <div>
      <Titulo>Lista</Titulo>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.valorUnitario}</td>
              <td>Visualizar Editar Apagar</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
