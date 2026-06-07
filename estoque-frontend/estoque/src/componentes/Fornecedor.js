import { useState, useEffect} from "react";
import axios from 'axios';

import '../css/Table.css';
import { FaTrash, FaPencilAlt, FaUserPlus  } from 'react-icons/fa';

import Modal from "./Modal"
import FornecedorCadastro from "./FornecedorCadastro";

function Fornecedor({
  fornecedores,
  setFornecedores,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fornecedor, setFornecedor] = useState({
    _id: "",
    nome: "",
    cnpj: "",
    endereco: "",
    email: "",
    telefone: "",
    nomeContato: ""
  });

  const [atualizarLista, setAtualizarLista] = useState(1);

  const [carregando, setCarregando] = useState(true);
  const url = "http://localhost:4000/fornecedor/"

  useEffect(() => {
    async function listaFornecedores () {
      try {
        setCarregando(true);
        const resposta = await axios.get(url);
        setFornecedores(resposta.data); // O Axios já entrega os dados formatados em .data
      } catch (error) {
        console.error("Erro na requisição", error);
      } finally {
        setCarregando(false);
      }
    }

    listaFornecedores();
  }, [isModalOpen, atualizarLista]);

  const cadastrarFornecedor = () => {
    let novoFornecedor = {
      _id: "",
      nome: "",
      cnpj: "",
      endereco: "",
      email: "",
      telefone: "",
      nomeContato: ""
    };
    setFornecedor(novoFornecedor);
    setIsModalOpen(true);
  };

  const alterarFornecedor = (itemFornecedor) => {
    //console.log(itemFornecedor)
    setFornecedor(itemFornecedor);
    setIsModalOpen(true)
  };

  const excluirFornecedor = (id) => {
    axios.delete(url + id)
    setAtualizarLista(atualizarLista + 1)
  };

  return (
    <>
      <h2>Fornecedores Cadastrados</h2>
      <div className="div-cadastro">
        <button className="div-cadastro-button" onClick={() => cadastrarFornecedor()}>
          <FaUserPlus size={16} color="white" />  
            Cadastrar
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <FornecedorCadastro fornecedor={fornecedor} setFornecedor={setFornecedor} setIsModalOpen={setIsModalOpen} />
      </Modal> 
      
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>CNPJ</th>
              <th>Endereço</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Contato</th>
              <th className="action-header">Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(fornecedores) && fornecedores.length > 0 && fornecedores.map((item) => (
              <tr key={item._id}>
                <td>{item.nome}</td>
                <td>{item.cnpj}</td>
                <td>{item.endereco}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>
                <td>{item.nomeContato}</td>
                <td className="action-cell">      
                    <FaPencilAlt size={16} color="green" onClick={() => alterarFornecedor(item)} />
                    <FaTrash size={16} color="red" onClick={() => excluirFornecedor(item._id)} />                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Fornecedor;