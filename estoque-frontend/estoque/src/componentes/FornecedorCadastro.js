import { useState, useEffect} from "react";
import axios from 'axios';

function FornecedorCadastro({
  fornecedor,
  setFornecedor,
  setIsModalOpen
}) {
  const [fornecedorForm, setFornecedorForm] = useState(fornecedor);

  const [mensagemValidacao, setMensagemValidacao] = useState("");

  const url = "http://localhost:4000/fornecedor/"

  //console.log(fornecedor)
  const salvarFornecedor = async (e) => {
    e.preventDefault();

    if(fornecedorForm.nome==="" || fornecedorForm.cnpj==="" || fornecedorForm.endereco==="" || fornecedorForm.email===""  
        || fornecedorForm.telefone==="" || fornecedorForm.nomeContato===""){
            setMensagemValidacao("Preencha todos os campos obrigatórios");
    }else{

        //console.log(resposta.data)
        try {
            let consultaFornecedor = "";
            try{
              consultaFornecedor = await axios.get(url + "buscaCnpj/" + fornecedorForm.cnpj);
              console.log(consultaFornecedor.data)
            }catch(e){
              //console.log("nao passou")
            }

            if(consultaFornecedor.data.length > 0 && consultaFornecedor.data[0]._id && consultaFornecedor.data[0]._id !== fornecedor._id){
              setMensagemValidacao("CNPJ já cadastrado");
            }else {
              setMensagemValidacao("");
              //console.log(fornecedorForm)
              if(fornecedor._id===""){
                  axios.post(url, fornecedorForm)
              }else{
                  //console.log(fornecedorForm)
                  axios.put(url, fornecedorForm)
              }
              setFornecedor(fornecedorForm);
              setIsModalOpen(false);
            }

        } catch (error) {
            console.error("Erro:", error);
        }
        
    }
    
  };

  return (
    <>
      <h2>Cadastro de Fornecedor</h2>

      <form onSubmit={salvarFornecedor}>
        <div class="form-group">
          <label>Nome da Empresa <span class="campoObrigatorio">*</span></label>
          <input
            type="text"
            placeholder="Insira o nome da empresa"
            value={fornecedorForm.nome}
            onChange={(e) =>
              setFornecedorForm({
                ...fornecedorForm,
                nome: e.target.value,
              })
            }
          />
        </div>

        <div class="form-group">
          <label>CNPJ <span class="campoObrigatorio">*</span></label>
          <input
            type="text"
            placeholder="00.000.000/0000-00"
            value={fornecedorForm.cnpj}
            onChange={(e) =>
              setFornecedorForm({
                ...fornecedorForm,
                cnpj: e.target.value,
              })
            }
          />
        </div>

        <div class="form-group">
          <label>Endereço <span class="campoObrigatorio">*</span></label>
          <input
            type="text"
            placeholder="Insira o endereço completo da empresa"
            value={fornecedorForm.endereco}
            onChange={(e) =>
              setFornecedorForm({
                ...fornecedorForm,
                endereco: e.target.value,
              })
            }
          />
        </div>

        <div class="form-group">
          <label>E-mail <span class="campoObrigatorio">*</span></label>
          <input
            type="text"
            placeholder="exemplo@fornecedor.com"
            value={fornecedorForm.email}
            onChange={(e) =>
              setFornecedorForm({
                ...fornecedorForm,
                email: e.target.value,
              })
            }
          />
        </div>

        <div class="form-group">
          <label>Telefone <span class="campoObrigatorio">*</span></label>
          <input
            type="text"
            placeholder="(00) 00000-0000"
            value={fornecedorForm.telefone}
            onChange={(e) =>
              setFornecedorForm({
                ...fornecedorForm,
                telefone: e.target.value,
              })
            }
          />
        </div>

        <div class="form-group">
          <label>Contato principal <span class="campoObrigatorio">*</span></label>
          <input
            type="text"
            placeholder="Nome do contato principal"
            value={fornecedorForm.nomeContato}
            onChange={(e) =>
              setFornecedorForm({
                ...fornecedorForm,
                nomeContato: e.target.value,
              })
            }
          />
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

export default FornecedorCadastro;