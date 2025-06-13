document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const termo = document.getElementById('searchInput').value.trim();

  if (!termo) return;

  try {
    const response = await fetch('http://127.0.0.1:8000/novo_sys/');
    const artigos = await response.json();

    // Busca exata pelo título (ex: "sys-1025")
    const artigoEncontrado = artigos.find(artigo =>
      artigo.titulo.toLowerCase() === termo.toLowerCase()
    );

    const container = document.getElementById('resultadoBusca');
    container.innerHTML = '';

    if (artigoEncontrado) {
      container.innerHTML = `
        <div class="artigo border p-3 my-2">
          <h3>${artigoEncontrado.titulo}</h3>
          <p>${artigoEncontrado.conteudo}</p>
          <p><strong>Publicado em:</strong> ${new Date(artigoEncontrado.data_criacao).toLocaleDateString()}</p>
          ${artigoEncontrado.anexo ? `<a href="${artigoEncontrado.anexo}" class="btn btn-outline-primary" target="_blank">Ver Anexo</a>` : ''}
        </div>
      `;
    } else {
      container.innerHTML = `<div class="alert alert-warning">Artigo não encontrado.</div>`;
    }

  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    alert('Erro ao buscar artigo.');
  }
});
