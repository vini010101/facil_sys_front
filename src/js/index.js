document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const termo = input.value.trim();
    if (!termo) {
      alert('Digite um termo para buscar.');
      return;
    }

    // Redireciona para todos_sys.html com termo na query string
    window.location.href = `/src/todos_sys.html?q=${encodeURIComponent(termo)}`;
  });
});
