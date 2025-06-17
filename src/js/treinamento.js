// função responsavel por buscar e exibir todo os treinamentos cadastrados no banco de dados.
async function carregarConteudos() {
      const container = document.getElementById('conteudos');
      const url = 'http://127.0.0.1:8000/treinamento/'; // ajuste conforme seu backend

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro ao buscar conteúdos');
        const data = await res.json();

        if (data.length === 0) {
          container.innerHTML = '<p style="text-align:center;">Nenhum conteúdo encontrado.</p>';
          return;
        }

        data.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card';

          card.innerHTML = `
            <h3>${item.titulo}</h3>
            <button onclick='abrirModal(${JSON.stringify(item)})'>Acessar</button>
          `;

          container.appendChild(card);
        });
      } catch (err) {
        container.innerHTML = `<p style="text-align:center;">Erro: ${err.message}</p>`;
      }
    }

    function abrirModal(item) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-content');

  const baseURL = 'http://127.0.0.1:8000'; // ajuste conforme necessário

  let conteudoHTML = item.conteudo || '';

  // Corrige caminhos relativos de mídia do Wagtail
  conteudoHTML = conteudoHTML
    .replace(/src="\/media\//g, `src="${baseURL}/media/`)
    .replace(/src='\/media\//g, `src='${baseURL}/media/`);

  let arquivoUrl = item.arquivo ? (item.arquivo.startsWith('http') ? item.arquivo : baseURL + item.arquivo) : null;

  // Modal base com rolagem
  let html = `
    <div id="modal-close" style="position: absolute; top: 10px; right: 20px; font-size: 2rem; cursor: pointer;">&times;</div>
    <div style="max-height: 80vh; overflow-y: auto; padding-right: 1rem;">
      <h2 style="margin-top: 0;">${item.titulo}</h2>
      <div style="margin-top: 1rem; font-size: 1rem; line-height: 1.8;">
        ${conteudoHTML}
      </div>
  `;

  if (arquivoUrl) {
    const ext = arquivoUrl.split('.').pop().toLowerCase();

    if (ext === 'pdf') {
      html += `
        <div style="margin-top: 1.5rem;">
          <a class="pdf-link" href="${arquivoUrl}" target="_blank" style="color: #007bff;">📄 Abrir material em PDF</a>
        </div>
      `;
    } else if (['mp4', 'webm', 'ogg'].includes(ext)) {
      html += `
        <div style="margin-top: 2rem;">
          <video controls style="width: 100%; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" src="${arquivoUrl}"></video>
        </div>
      `;
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext)) {
      html += `
        <div style="margin-top: 1.5rem; text-align: center;">
          <img src="${arquivoUrl}" alt="Imagem do módulo" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" />
        </div>
      `;
    } else {
      html += `
        <div style="margin-top: 1.5rem;">
          <iframe src="${arquivoUrl}" style="width: 100%; height: 400px; border: none;"></iframe>
        </div>
      `;
    }
  }

  html += `</div>`; // Fecha o content-wrapper com scroll

  content.innerHTML = html;
  modal.style.display = 'flex';

  document.getElementById('modal-close').onclick = () => {
    modal.style.display = 'none';
  };
}
carregarConteudos();
 