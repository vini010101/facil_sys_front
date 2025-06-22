/**
 * Busca artigos no backend conforme termo informado
 * @param {string} termo Texto a buscar
 * @returns {Promise<Array>} Lista de artigos encontrados
 */
async function buscarArtigos(termo) {
  if (!termo) return [];

  try {
    const response = await fetch(`http://127.0.0.1:8000/novo_sys/?q=${encodeURIComponent(termo)}`);
    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error('Erro na busca:', error);
    return [];
  }
}

/**
 * Renderiza lista de artigos em um container HTML
 * @param {Array} artigos Lista de artigos para renderizar
 * @param {HTMLElement} container Elemento onde será renderizado
 * @param {string} termo Termo da busca para mostrar mensagem caso vazio
 */
function renderizarArtigos(artigos, container, termo = '') {
  container.innerHTML = '';

  if (!artigos.length) {
    container.innerHTML = `<div class="alert alert-info">Nenhum resultado encontrado para "${termo}".</div>`;
    return;
  }

  artigos.forEach(artigo => {
    container.innerHTML += `
      <div class="artigo border rounded p-4 my-3 shadow-sm bg-light">
        <h3 class="mb-3">${artigo.titulo}</h3>

        <section class="mb-3" style="white-space: pre-line;">
          ${artigo.conteudo}
        </section>

        <ul class="list-unstyled mb-3">
          <li><strong>Categoria:</strong> ${artigo.categoria}</li>
          <li><strong>Autor:</strong> ${artigo.autor || 'Anônimo'}</li>
          <li><strong>Publicado em:</strong> ${new Date(artigo.data_criacao).toLocaleDateString()}</li>
        </ul>

        ${artigo.anexo ? `<a href="${artigo.anexo}" class="btn btn-outline-primary" target="_blank">Ver Anexo</a>` : ''}
      </div>
    `;
  });
}

// Código para ativar a busca no formulário
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const resultados = document.getElementById('resultados');

  // Remove 'q' vazio da URL
  const params = new URLSearchParams(window.location.search);
  if (params.has('q') && params.get('q').trim() === '') {
    params.delete('q');
    const url = new URL(window.location);
    url.search = params.toString();
    window.history.replaceState({}, document.title, url.toString());
  }

  

  // Se tiver termo 'q' na URL, executa busca automática
  const termoUrl = params.get('q');
  if (termoUrl && termoUrl.trim() !== '') {
    input.value = termoUrl;
    buscarArtigos(termoUrl).then(artigos => {
      renderizarArtigos(artigos, resultados, termoUrl);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const termo = input.value.trim();
    if (!termo) {
      resultados.innerHTML = '<div class="alert alert-warning">Digite um termo para buscar.</div>';
      return;
    }

    const artigos = await buscarArtigos(termo);
    renderizarArtigos(artigos, resultados, termo);
  });
});
