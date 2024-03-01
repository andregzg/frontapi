async function carregarDadosPessoas() {
    try {
        const response = await fetch('http://localhost:8080/api');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar dados das pessoas:', error);
        return [];
    }
}

async function preencherTabela() {
    const pessoas = await carregarDadosPessoas();
    const tableBody = document.querySelector('#pessoasTable tbody');
    tableBody.innerHTML = '';


    pessoas.sort((a, b) => a.codigo - b.codigo);

    pessoas.forEach(pessoa => {
        const row = `
            <tr>
                <td>${pessoa.codigo}</td>
                <td>${pessoa.nome}</td>
                <td>${pessoa.email}</td>
                <td>${pessoa.idade}</td>
                <td>
                    <button class="btn edit" onclick="editarPessoa(${pessoa.codigo})">Editar</button>
                    <button class="btn delete" onclick="excluirPessoa(${pessoa.codigo})">Excluir</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

if (typeof window !== 'undefined') {
    window.onload = preencherTabela;
}
async function salvarAlteracoes() {
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;

    const dadosAtualizados = {
        codigo: codigo,
        nome: nome,
        email: email,
        idade: idade
    };

    try {
        const response = await fetch('http://localhost:8080/api/' + codigo, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            fecharModal();

            preencherTabela();
        } else {
            console.error('Erro ao salvar as alterações:', response.status);
        }
    } catch (error) {
        console.error('Erro ao salvar as alterações:', error);
    }
}

