// Pequenas interações (opcional)
// Foco visível ao navegar por teclado nos botões
const btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
  btn.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') btn.classList.add('is-tabbing');
  });
});
