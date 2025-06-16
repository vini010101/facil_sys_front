
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