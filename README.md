# 🌐 FacilSys Frontend (Client-Side)

Este repositório contém o **frontend desacoplado** do sistema **FacilSys**, uma plataforma de apoio técnico desenvolvida para uso interno da empresa **Fácil Tecnologia**.

Este frontend é renderizado no **cliente (client-side rendering)** e **consome dados dinamicamente da API** desenvolvida em Django (Django REST Framework).

---

## 🎯 Objetivo

- Fornecer uma **interface leve, direta e funcional** para técnicos de suporte
- Permitir consulta a **artigos técnicos, sistemas internos e normas**
- Acessar e exibir dados da API do FacilSys com atualizações em tempo real

---

## ✨ Funcionalidades

- ✅ Listagem de artigos via consumo de API REST
- ✅ Filtro por categoria e busca por título/conteúdo
- ✅ Exibição de artigo completo com data, autor e anexo (se houver)
- ✅ Consulta a sistemas internos da empresa com descrição
- ✅ Navegação rápida com rotas client-side e scripts dinâmicos

---

## 📦 Tecnologias Utilizadas

- **HTML5**
- **Bootstrap CSS**
- **JavaScript (fetch/AJAX)**  
*(Pode ser substituído por React/Next.js futuramente)*


git clone https://github.com/viniciuscalebe/facil_sys_front.git
cd facil_sys_front

Abra o index.html com servidor local (ex: Live Server):
Certifique-se de que o backend Django está rodando na porta correta (ex: http://localhost:8000/artigos/)

A interface buscará os dados da API dinamicamente.
fetch('http://localhost:8000/artigos/')
  .then(res => res.json())
  .then(data => {
    // renderiza os artigos dinamicamente
  })


🧠 Considerações Técnicas
Este frontend é completamente separado do backend

Toda a lógica de carregamento e exibição é feita no cliente (JavaScript)

Pode ser futuramente migrado para uma stack SPA (React, Vue ou Svelte)

O código está modularizado para facilitar manutenção e evolução

👨‍💻 Autor
Vinicius Calebe Barbosa de Moura
Desenvolvedor Backend Python
