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