import { useState, useEffect } from "react";

import axios from 'axios';

import '../css/Table.css';
import { FaTrash, FaPencilAlt, FaUserPlus  } from 'react-icons/fa';

import Modal from "./Modal"
import ProdutoCadastro from "./ProdutoCadastro";

function Produto({
  produtos,
  setProdutos,
}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [produto, setProduto] = useState({
    _id: "",
    codigo: "",
    nome: "",
    quantidade: 0,
    descricao: "",
    categoria: 1,
  });

  const categorias = [
    {"id": 1, "nome": "Alimentos"},
    {"id": 2, "nome": "Bebida"},
    {"id": 3, "nome": "Higiene"},
    {"id": 4, "nome": "Limpeza"},
    {"id": 5, "nome": "Perecível"}
  ]

  const [atualizarLista, setAtualizarLista] = useState(1);

  const [carregando, setCarregando] = useState(true);
  const url = "http://localhost:4000/produto/"

  useEffect(() => {
    async function listaProdutos () {
      try {
        setCarregando(true);
        const resposta = await axios.get(url);
        setProdutos(resposta.data); // O Axios já entrega os dados formatados em .data
      } catch (error) {
        console.error("Erro na requisição", error);
      } finally {
        setCarregando(false);
      }
    }

    listaProdutos();
  }, [isModalOpen, atualizarLista]);

   const cadastrarProduto = () => {
    let novoProduto = {
       _id: "",
        codigo: "",
        nome: "",
        quantidade: 0,
        descricao: "",
        categoria: 1,
    };
    setProduto(novoProduto);
    setIsModalOpen(true);
  };

  const alterarProduto = (itemProduto) => {
    //console.log(itemProduto)
    setProduto(itemProduto);
    setIsModalOpen(true)
  };

  const excluirProduto = (id) => {
    axios.delete(url + id)
    setAtualizarLista(atualizarLista + 1)
  };

  return (
    <>
      <h2>Produtos Cadastrados</h2>
      <div className="div-cadastro">
        <button className="div-cadastro-button" onClick={() => cadastrarProduto()}>
          <FaUserPlus size={16} color="white" />  
            Cadastrar
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <ProdutoCadastro produto={produto} setProduto={setProduto} categorias={categorias} setIsModalOpen={setIsModalOpen} />
      </Modal>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Código de barras</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Categoria</th>
              <th className="action-header">Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(produtos) && produtos.length > 0 && produtos.map((item) => (
              <tr key={item._id}>
                <td>{item.nome}</td>
                <td>{item.codigo}</td>
                <td>{item.descricao}</td>
                <td>{item.quantidade}</td>
                <td>{categorias.find(c => c.id === item.categoria)?.nome || item.categoria}</td>
                <td className="action-cell">      
                    <FaPencilAlt size={16} color="green" onClick={() => alterarProduto(item)} />
                    <FaTrash size={16} color="red" onClick={() => excluirProduto(item._id)} />                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Produto;