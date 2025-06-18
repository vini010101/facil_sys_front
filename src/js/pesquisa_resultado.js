// resultado_busca.js

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
}
