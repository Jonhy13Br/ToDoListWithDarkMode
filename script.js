// Inicializa a lista de tarefas com o conteúdo armazenado no localStorage, se houver
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function adicionarTarefa() {
    const entradaTarefa = document.getElementById('entradaTarefa');
    const textoTarefa = entradaTarefa.value.trim();
    if (textoTarefa !== '') {
        tarefas.push({ texto: textoTarefa, concluida: false });
        entradaTarefa.value = '';
        salvarTarefas();
        renderizarTarefas();
    }
}

function renderizarTarefas(tarefasFiltradas = tarefas) {
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = '';
    tarefasFiltradas.forEach((tarefa, posicao) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" onchange="alternarConclusao(${posicao})" ${tarefa.concluida ? 'checked' : ''}>
            <span class="${tarefa.concluida ? 'completada' : ''}">${tarefa.texto}</span>
            <button onclick="editarTarefa(${posicao})">Editar</button>
            <button onclick="excluirTarefa(${posicao})">Excluir</button>
        `;
        listaTarefas.appendChild(li);
    });
}

function editarTarefa(posicao) {
    const novoTexto = prompt('Editar tarefa:', tarefas[posicao].texto);
    if (novoTexto !== null) {
        tarefas[posicao].texto = novoTexto.trim();
        salvarTarefas();
        renderizarTarefas();
    }
}

function excluirTarefa(posicao) {
    tarefas.splice(posicao, 1);
    salvarTarefas();
    renderizarTarefas();
}

function filtrarCompletas() {
    const tarefasCompletas = tarefas.filter(tarefa => tarefa.concluida);
    renderizarTarefas(tarefasCompletas);
}

function filtrarPendentes() {
    const tarefasPendentes = tarefas.filter(tarefa => !tarefa.concluida);
    renderizarTarefas(tarefasPendentes);
}

function resetarFiltros() {
    renderizarTarefas();
}

function alternarConclusao(posicao) {
    tarefas[posicao].concluida = !tarefas[posicao].concluida;
    salvarTarefas();
    renderizarTarefas();
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

renderizarTarefas();
//dark mode
const darkModeBtn = document.getElementById('darkModeBtn');

darkModeBtn.addEventListener('click', () => {
    
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');

    if (isDarkMode) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
});
