// main.js (ou seu arquivo separado)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const container = document.getElementById('resultadoBusca');

  if (!form || !input || !container) return; // evita erro em páginas sem o formulário

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const termo = input.value.trim();
    if (!termo) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/novo_sys/?q=${encodeURIComponent(termo)}`);
      const artigos = await response.json();

      container.innerHTML = ''; // limpa os resultados anteriores

      if (artigos.length > 0) {
        artigos.forEach(artigo => {
          container.innerHTML += `
            <div class="artigo border p-3 my-2">
              <h3>${artigo.titulo}</h3>
              <p>${artigo.conteudo}</p>
              <p><strong>Categoria:</strong> ${artigo.categoria}</p>
              <p><strong>Autor:</strong> ${artigo.autor || 'Anônimo'}</p>
              <p><strong>Publicado em:</strong> ${new Date(artigo.data_criacao).toLocaleDateString()}</p>
              ${artigo.anexo ? `<a href="${artigo.anexo}" class="btn btn-outline-primary" target="_blank">Ver Anexo</a>` : ''}
            </div>
          `;
        });
      } else {
        container.innerHTML = `<div class="alert alert-warning">Nenhum artigo encontrado com esse termo.</div>`;
      }

    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      alert('Erro ao buscar artigos.');
    }
  });
});
