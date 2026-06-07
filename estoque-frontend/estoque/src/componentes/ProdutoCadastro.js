import { useState } from "react";
import axios from 'axios';

function ProdutoCadastro({
  produto,
  setProduto,
  categorias,
  setIsModalOpen
}) {
  const [produtoForm, setProdutoForm] = useState(produto);

  const [mensagemValidacao, setMensagemValidacao] = useState("");

  const url = "http://localhost:4000/produto/"

  //console.log(produtoForm)

  //console.log(produto)
  const salvarProduto = async (e) => {
    e.preventDefault();

    if(produtoForm.codigo==="" || produtoForm.nome==="" || produtoForm.quantidade==="" || produtoForm.descricao===""  
        || produtoForm.categoria===""){
            setMensagemValidacao("Preencha todos os campos obrigatórios");
    }else{

        try {

            let consultaProduto = "";
            try{
              consultaProduto = await axios.get(url + "buscaCodigo/" + produtoForm.codigo);
              //console.log("yyyyyyyyyy")
              console.log(consultaProduto.data)
            }catch(e){
              //console.log("nao passou")
            }

            if(consultaProduto.data.length > 0 && consultaProduto.data[0]._id && consultaProduto.data[0]._id !== produtoForm._id){
              setMensagemValidacao("Código de barras já cadastrado");
            }else {
              //console.log(produtoForm)
              setMensagemValidacao("");
              if(produto._id===""){
                  axios.post(url, produtoForm)
              }else{
                  console.log(produtoForm)
                  axios.put(url, produtoForm)
              }
              setProduto(produtoForm);
              setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Erro:", error);
        }
        
    }
    
  };

  return (
    <>
      <h2>Cadastro de Produto</h2>

      <form onSubmit={salvarProduto}>
        <div class="form-group">
          <label>Nome do Produto <span class="campoObrigatorio">*</span></label>
          <input
            type="text"
            placeholder="Insira o nome do produto"
            value={produtoForm.nome}
            onChange={(e) =>
              setProdutoForm({
                ...produtoForm,
                nome: e.target.value,
              })
            }
          />
        </div>

        <div class="form-group">
          <label>Código de barras <span class="campoObrigatorio">*</span></label>
          <input
            type="number"
            placeholder="Insira o código de barras"
            value={produtoForm.codigo}
            onChange={(e) =>
              setProdutoForm({
                ...produtoForm,
                codigo: e.target.value,
              })
            }
          />
        </div>
        <div class="form-group">
          <label>Quantidade <span class="campoObrigatorio">*</span></label>
          <input
            type="number"
            placeholder="Quantidade em estoque"
            value={produtoForm.quantidade}
            onChange={(e) =>
              setProdutoForm({
                ...produtoForm,
                quantidade: e.target.value,
              })
            }
          />
        </div>

        <div class="form-group">
          <label>Categoria <span class="campoObrigatorio">*</span></label>
          <select 
            id="fruits" 
            value={produtoForm.categoria} 
            onChange={(e) =>
            setProdutoForm({
              ...produtoForm,
              categoria: e.target.value,
            })
          }
          >
            {
              categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
              ))
            }
          </select>
        </div>

        <div class="form-group">
          <label>Descrição <span class="campoObrigatorio">*</span></label>
          <textarea placeholder="Descreva brevemente o produto"
            onChange={(e) =>
              setProdutoForm({
                ...produtoForm,
                descricao: e.target.value,
              })
            }>{produtoForm.descricao}
          </textarea>
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

export default ProdutoCadastro;