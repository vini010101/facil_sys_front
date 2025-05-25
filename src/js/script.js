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



// rota responsavel por realizar a criação de um novo usuario no sistema
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
