document.addEventListener('DOMContentLoaded', async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');

      if (!id) {
        document.body.innerHTML = '<div class="container py-5"><h2>Artigo não encontrado.</h2></div>';
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/novo_sys/');
        const artigos = await response.json();
        const artigo = artigos.find(a => a.id == id);

        if (!artigo) {
          document.body.innerHTML = '<div class="container py-5"><h2>Artigo não encontrado.</h2></div>';
          return;
        }

        document.getElementById('titulo').innerText = artigo.titulo;
        document.getElementById('data').innerText = `Publicado em: ${new Date(artigo.data_criacao).toLocaleDateString()}`;
        document.getElementById('conteudo').innerText = artigo.conteudo;

        if (artigo.anexo) {
          document.getElementById('anexoContainer').innerHTML =
            `<a href="${artigo.anexo}" target="_blank" rel="noopener noreferrer">Ver Anexo</a>`;
        }

      } catch (e) {
        console.error(e);
        document.body.innerHTML = '<div class="container py-5"><h2>Erro ao carregar artigo.</h2></div>';
      }
    });