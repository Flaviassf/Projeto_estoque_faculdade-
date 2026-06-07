import React, { useState } from "react";
import "./App.css";

import Menu from "./componentes/Menu";
import Fornecedor from "./componentes/Fornecedor";
import CadastroProduto from "./componentes/Produto";
import ProdutoFornecedor from "./componentes/ProdutoFornecedor";
import Modal from "./componentes/Modal"

function App() {
  const [menu, setMenu] = useState("fornecedor");

  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtosFornecedores, setProdutosFornecedores] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    
    <div class="container">
      <div>
        <h2>Controle de Estoque</h2>
      </div>

      <Menu menu={menu} setMenu={setMenu} />
      
      <div class="conteudo" id="conteudo-aba1">
        {menu === "fornecedor" && (
          <Fornecedor
            fornecedores={fornecedores}
            setFornecedores={setFornecedores}
          />
        )}

        {menu === "produto" && (
          <CadastroProduto
            produtos={produtos}
            setProdutos={setProdutos}
          />
        )}

        {menu === "vinculo" && (
          <ProdutoFornecedor
            produtosFornecedores={produtosFornecedores}
            setProdutosFornecedores={setProdutosFornecedores}
          />
        )}

      </div>
    </div>
  );
}

export default App;