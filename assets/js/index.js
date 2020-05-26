let tarefas = [
    {
        id: 1,
        texto: 'Escovar os dentes',
        prioridade: 'Alta', 
        feito: true
    },{
        id: 2,
        texto: 'Almoçar',
        prioridade: 'Alta', 
        feito: false
    },{
        id: 3,
        texto: 'Limpar caixinha do gato',
        prioridade: 'Média', 
        feito: true
    },{
        id: 4,
        texto: 'Acabar com o capitalismo',
        prioridade: 'Baixa', 
        feito: false
    }

]

const render = (tarefas) => {
    let table = document.getElementById('table')
    
    table.innerText = "";

    for (const tarefa of tarefas) {
        
        // Cria a linha da tabela
        let row = document.createElement('tr');
        if (tarefa.feito){
            // row.classList.add("done");
            row.className = "done";
        }

        // Cria o checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = tarefa.feito;
        checkbox.id = "chk_" + tarefa.id
        checkbox.addEventListener('click', onCheckClick)

        //  Cria a celula do checkbox
        let tdCheck = document.createElement('td');
        tdCheck.appendChild(checkbox);

        // Adiciona tdCheck na row
        row.appendChild(tdCheck);

        // Cria a td do texto
        let tdTexto = document.createElement('td');
        tdTexto.innerText = tarefa.texto;
        row.appendChild(tdTexto);

        // Cria td prioridade
        let tdPrioridade = document.createElement('td');
        tdPrioridade.innerText = tarefa.prioridade;
        row.appendChild(tdPrioridade);

        //Cria td açoes
        let tdAcoes = document.createElement('td');
        let i = document.createElement('i');
        i.className = 'material-icons';
        i.innerText = 'delete';
        i.addEventListener('click', onDeleteClick)
        i.setAttribute("id", tarefa.id);
        tdAcoes.appendChild(i);
        row.appendChild(tdAcoes);
       


        //Adiciona a linha à tabela
        table.appendChild(row);

    }
}
const create = (texto, prioridade) => {
   let id = (tarefas.length==0 ? 1 : tarefas[tarefas.length - 1].id + 1);

    return {
        id,
        texto,
        prioridade,
        feito: false
    };
    
}
const destroy = (id) => {
    tarefas = tarefas.filter(t => t.id != id);
}
const onFormSubmit = (evt) => {
    //evento evita comportamento padrão do form
    evt.preventDefault();

    //captura o texto do usuário
    let texto = document.getElementById('tf_2do').value;

    //verifica se existe prioridade
    let strInicio = texto.substr(0,3);
    let prioridade;
    switch (strInicio) {
        case '#1 ':
            prioridade = 'Alta';
            texto = texto.slice(3);
            break;
        case '#2 ':
            prioridade = 'Média';
            texto = texto.slice(3);
            break;
        case '#3 ':
            prioridade = 'Baixa';
            texto = texto.slice(3);
            break;
        default:
            prioridade = 'Alta';
            break;
    }

    //cria o objeto de tarefa
    let tarefa = create(texto, prioridade);

    //adiciona o objeto tarefa ao array de tarefas
    tarefas.push(tarefa);
    // renderiza a lista novamente
    render(tarefas)

    // limpar campo de texto
    document.getElementById('tf_2do').value = '';

}
const onDeleteClick = (evt) => {
    //captura id da tarefa
    let id = Number(evt.target.id);

    //confirma exclusao
    if(!window.confirm('Tem certeza disso imão?')){
        // se o usuario clica no nao aborto
        return;
    }

    //remover tarefa do array
    destroy(id);

    //renderizar novamente
    render(tarefas);
}
const onCheckClick = (evt) => {
    // captura id da tarefa
    let id = Number(evt.target.id.replace('chk_', ''));

    // levanta tarefa do id capturado
    let tarefa = tarefas.find(t => t.id == id);

    // alterar o campo feito
    tarefa.feito = !tarefa.feito;

    // adicionar 'class=done' ou não
    evt.target.parentNode.parentNode.classList.toggle('done');
}

let form = document.getElementById('form');

form.addEventListener('submit', onFormSubmit)




render(tarefas);

