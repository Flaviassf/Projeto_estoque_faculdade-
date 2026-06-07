import React, { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Não renderiza nada se o modal estiver fechado

  return (
     // Fundo escuro (overlay)
    <div id="meu-modal" class="modal mostrar">
        <div class="modal-conteudo">
            <span id="close-btn" class="fechar" onClick={onClose}>&times;</span>
            <div>{children}</div>
        </div>
    </div>
  );
}

export default Modal;