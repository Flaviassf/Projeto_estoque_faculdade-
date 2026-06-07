import { useState, useEffect } from "react";
import axios from 'axios';

import '../css/Table.css';
import { FaTrash, FaPencilAlt, FaUserPlus  } from 'react-icons/fa';

import Modal from "./Modal"
import ProdutoFornecedorCadastro from "./ProdutoFornecedorCadastro";

function ProdutoFornecedor({
  produtosFornecedores,
  setProdutosFornecedores,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [produtoFornecedor, setProdutoFornecedor] = useState({
    _id: "",
    idProduto: "",
    nomeProduto: "",
    idFornecedor: "",
    nomeFornecedor: "",
  });

  const [atualizarLista, setAtualizarLista] = useState(1);

  const [carregando, setCarregando] = useState(true);
  const url = "http://localhost:4000/produtoFornecedor/"

  useEffect(() => {
    async function listaProdutosFornecedores () {
      try {
        setCarregando(true);       
        const resposta = await axios.get(url);
        //console.log(resposta.data)
        setProdutosFornecedores(resposta.data); // O Axios já entrega os dados formatados em .data
      } catch (error) {
        console.error("Erro na requisição", error);
      } finally {
        setCarregando(false);
      }
    }

    listaProdutosFornecedores();
  }, [isModalOpen, atualizarLista]);

  //setProdutosFornecedores([]);
   const cadastrarProdutoFornecedor = () => {
    let novoVinculo = {
      _id: "",
      idProduto: "",
      nomeProduto: "",
      idFornecedor: "",
      nomeFornecedor: "",
    };
    setProdutoFornecedor(novoVinculo);
    setIsModalOpen(true);
  };

  const alterarProdutoFornecedor = (itemProdutoFornecedor) => {
    //console.log(itemProdutoFornecedor)
    setProdutoFornecedor(itemProdutoFornecedor);
    setIsModalOpen(true)
  };

  const excluirProdutoFornecedor = (id) => {
    axios.delete(url + id)
    setAtualizarLista(atualizarLista + 1)
  };

  return (
    <>
      <h2>Produtos e Fornecedores Vinculados</h2>
      <div className="div-cadastro">
        <button className="div-cadastro-button" onClick={() => cadastrarProdutoFornecedor()}>
          <FaUserPlus size={16} color="white" />  
            Cadastrar
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <ProdutoFornecedorCadastro produtoFornecedor={produtoFornecedor} setProdutoFornecedor={setProdutoFornecedor} setIsModalOpen={setIsModalOpen} />
      </Modal>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Fornecedor</th>
              <th className="action-header">Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(produtosFornecedores) && produtosFornecedores.length > 0 && produtosFornecedores.map((item) => (
              <tr key={item._id}>
                <td>{item.nomeProduto}</td>
                <td>{item.nomeFornecedor}</td>
                <td className="action-cell">      
                   {/* <FaPencilAlt size={16} color="green" onClick={() => alterarProdutoFornecedor(item)} /> */}
                    <FaTrash size={16} color="red" onClick={() => excluirProdutoFornecedor(item._id)} />                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProdutoFornecedor;