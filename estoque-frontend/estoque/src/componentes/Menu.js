import { useState } from "react";

function Menu({ setMenu }) {

  const [aba, setAba] = useState('fornecedor');

  const selecionaMenu = (menuSelecionado) => {
    setMenu(menuSelecionado);
    setAba(menuSelecionado);
  };

  return (
    <div class="container-abas">
      <input type="radio" name="grupo-abas" id="aba1" checked={aba==="fornecedor"} onClick={() => selecionaMenu("fornecedor")} />
      <label for="aba1">Fornecedor</label>

      <input type="radio" name="grupo-abas" id="aba2" checked={aba==="produto"} onClick={() => selecionaMenu("produto")} />
      <label for="aba2">Produto</label>

      <input type="radio" name="grupo-abas" id="aba3" checked={aba==="vinculo"} onClick={() => selecionaMenu("vinculo")} />
      <label for="aba3">Produto / Fornecedor</label>
    </div>
  );
}

export default Menu;