// função responsavel por buscar e exibir todo os treinamentos caddastrados no banco de dados.
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
 
 // trecho do codigo js responsavel por buscar e exibir todos os sys resgitrados no banco de dados
 document.addEventListener('DOMContentLoaded', async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/novo_sys/');
        if (!response.ok) throw new Error('Erro na requisição');
        const sysList = await response.json();

        const listaSys = document.getElementById('listaSys');
        if (!sysList.length) {
          listaSys.innerHTML = '<li>Nenhum SYS encontrado.</li>';
          return;
        }

        sysList.forEach(sys => {
          const li = document.createElement('li');
          li.textContent = sys.titulo;

          // Opcional: se quiser abrir a página do artigo ao clicar
           li.addEventListener('click', () => {
           window.location.href = `artigo.html?id=${sys.id}`;
           });

          listaSys.appendChild(li);
        });

      } catch (error) {
        console.error(error);
        document.getElementById('listaSys').innerHTML = '<li>Erro ao carregar SYS.</li>';
      }
    });


// trecho do codigo js responsaelvel por buscar por palavras chaves
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


// esse trecho do codigo é responsavel por fazer a requisição de login para o backend

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("message").innerHTML = "Login bem-sucedido!";
      document.getElementById("message").classList.remove("text-danger");
      document.getElementById("message").classList.add("text-success");

        // Salvar o token (se necessário)
        localStorage.setItem("auth_token", data.token); // só se o backend retornar um token
        window.location.href = "index.html"

      console.log(data); // Exibe token ou resposta da API
    } else {
      document.getElementById("message").innerHTML = data.detail || "Erro no login.";
      document.getElementById("message").classList.remove("text-success");
      document.getElementById("message").classList.add("text-danger");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    document.getElementById("message").innerHTML = "Erro de conexão com o servidor.";
    document.getElementById("message").classList.remove("text-success");
    document.getElementById("message").classList.add("text-danger");
  }
});


// função responsavel por realizar a criação de um novo usuario no sistema
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/registro/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("message").innerHTML = "Usuario criado com sucesso!";
      document.getElementById("message").classList.remove("text-danger");
      document.getElementById("message").classList.add("text-success");
      console.log(data); // Exibe token ou resposta da API
    } else {
      document.getElementById("message").innerHTML = data.detail || "Erro ao criar usuario.";
      document.getElementById("message").classList.remove("text-success");
      document.getElementById("message").classList.add("text-danger");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    document.getElementById("message").innerHTML = "Erro de conexão com o servidor.";
    document.getElementById("message").classList.remove("text-success");
    document.getElementById("message").classList.add("text-danger");
  }
});



document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const termo = document.getElementById('searchInput').value.trim();

  if (!termo) return;

  try {
    const response = await fetch('http://127.0.0.1:8000/novo_sys/');
    const artigos = await response.json();

    const artigoEncontrado = artigos.find(artigo =>
      artigo.titulo.toLowerCase().includes(termo.toLowerCase())
    );

    if (artigoEncontrado) {
      window.location.href = `/artigo.html?id=${artigoEncontrado.id}`;
    } else {
      alert('Artigo não encontrado.');
    }

  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    alert('Erro ao buscar artigo.');
  }
});


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
        `<a href="${artigo.anexo}" class="btn btn-outline-primary" target="_blank">Ver Anexo</a>`;
    }

  } catch (e) {
    console.error(e);
    document.body.innerHTML = '<div class="container py-5"><h2>Erro ao carregar artigo.</h2></div>';
  }
});

