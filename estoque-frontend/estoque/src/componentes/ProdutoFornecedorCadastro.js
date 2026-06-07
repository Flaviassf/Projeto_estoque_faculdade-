import { useState, useEffect } from "react";
import axios from 'axios';

function ProdutoFornecedorCadastro({
  produtoFornecedor,
  setProdutoFornecedor,
  setIsModalOpen
}) {

  const [produtoFornecedorForm, setProdutoFornecedorForm] = useState(produtoFornecedor);
  const [produtos, setProdutos] = useState({});
  const [fornecedores, setFornecedores] = useState({});
  const [mensagemValidacao, setMensagemValidacao] = useState("");

  const urlProduto = "http://localhost:4000/produto/"

  useEffect(() => {
    async function listaProdutos () {
      try {
        const resposta = await axios.get(urlProduto);
        setProdutos(resposta.data); // O Axios já entrega os dados formatados em .data
      } catch (error) {
        console.error("Erro na requisição", error);
      } finally {
      }
    }
    listaProdutos();
  }, []);

  const urlFornecedor = "http://localhost:4000/fornecedor/"

  useEffect(() => {
    async function listaFornecedores () {
      try {
        //setCarregando(true);
        const resposta = await axios.get(urlFornecedor);
        setFornecedores(resposta.data); // O Axios já entrega os dados formatados em .data
      } catch (error) {
        console.error("Erro na requisição", error);
      } finally {
        //setCarregando(false);
      }
    }

    listaFornecedores();
  }, []);

  console.log(fornecedores)

  const url = "http://localhost:4000/produtoFornecedor/"

  const salvarVinculo = async (e) => {
    e.preventDefault();

   if(produtoFornecedorForm.idFornecedor==="" || produtoFornecedorForm.produto===""){
            setMensagemValidacao("Preencha todos os campos obrigatórios");
    }else{

        try {

            let consultaVinculacao = "";
            try{
              consultaVinculacao = await axios.get(url + "buscaVinculo/" + produtoFornecedorForm.idProduto + "/" + produtoFornecedorForm.idFornecedor);
              console.log("yyyyyyyyyy")
              console.log(consultaVinculacao.data)
            }catch(e){
              //console.log("nao passou")
            }

            if(consultaVinculacao.data && consultaVinculacao.data.length > 0){
              setMensagemValidacao("Produto e Fornecedor já vinculado");
            }else {
              let vinculacao = produtoFornecedorForm;
              vinculacao.nomeProduto = produtos.find(p => p._id === produtoFornecedorForm.idProduto)?.nome;
              vinculacao.nomeFornecedor = fornecedores.find(f => f._id === produtoFornecedorForm.idFornecedor)?.nome;
      
              console.log(vinculacao)
              if(produtoFornecedorForm._id===""){
                  axios.post(url, vinculacao)
              }else{
                  //console.log(produtoForm)
                  axios.put(url, produtoFornecedorForm)
              }
              setProdutoFornecedor(produtoFornecedorForm);
              setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Erro:", error);
        }
        
    }
  };

  return (
    <>
      <h2>Vincular Produto e Fornecedor</h2>

      <form onSubmit={salvarVinculo}>

        <div class="form-group">
          <label>Fornecedor <span class="campoObrigatorio">*</span></label>
          <select
            value={produtoFornecedorForm.idFornecedor}
            onChange={(e) =>
              setProdutoFornecedorForm({
                  ...produtoFornecedorForm,
                  idFornecedor: e.target.value,
                })
            }
          >
            <option value="">
              Selecione o fornecedor
            </option>

            {Array.isArray(fornecedores) && fornecedores.length > 0 && fornecedores.map((f) => (
              <option key={f._id} value={f._id}>
                {f.nome}
              </option>
            ))}
          </select>
        </div>

        <div class="form-group">
          <label>Produto <span class="campoObrigatorio">*</span></label>
          <select
            value={produtoFornecedorForm.idProduto}
            onChange={(e) =>
              setProdutoFornecedorForm({
                  ...produtoFornecedorForm,
                  idProduto: e.target.value,
                })
            }
          >
            <option value="">
              Selecione o produto
            </option>

            {Array.isArray(produtos) && produtos.length > 0 && produtos.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="div-mensagem-validacao div-mensagem-validacao-erro">
            { mensagemValidacao }
        </div>
        <button type="submit">
          Salvar
        </button>
      </form>
    </>
  );
}

export default ProdutoFornecedorCadastro;