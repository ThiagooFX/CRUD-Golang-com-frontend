const apiUrl = 'http://127.0.0.1:5500/usuarios';

        // Função para carregar os usuários
        async function carregarUsuarios() {
            const response = await fetch(apiUrl);
            const usuarios = await response.json();
            console.log("Chamou a API")

            const userList = document.getElementById('userList');
            userList.innerHTML = ''; // Limpa a lista

            usuarios.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${user.id} - ${user.nome}
                    <div>
                        <button class="edit-btn" onclick="editarUsuario(${user.id}, '${user.nome}')">Editar</button>
                        <button class="delete-btn" onclick="excluirUsuario(${user.id})">Excluir</button>
                    </div>
                `;
                userList.appendChild(li);
            });
        }

        // Função para salvar (criar ou atualizar) usuário
        async function salvarUsuario() {
            const userId = document.getElementById('userId').value;
            const userName = document.getElementById('userName').value;

            if (!userName.trim()) {
                alert("O nome do usuário não pode estar vazio!");
                return;
            }

            const userData = { nome: userName };

            const method = userId ? 'PUT' : 'POST';
            const url = userId ? `${apiUrl}/${userId}` : apiUrl;

            await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            alert("Usuário salvo com sucesso!");
            limparFormulario();
            carregarUsuarios();
        }

        // Função para editar usuário (preenche o formulário)
        function editarUsuario(id, nome) {
            document.getElementById('userId').value = id;
            document.getElementById('userName').value = nome;
        }

        // Função para excluir usuário
        async function excluirUsuario(id) {
            if (confirm("Tem certeza que deseja excluir este usuário?")) {
                await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
                alert("Usuário excluído com sucesso!");
                carregarUsuarios();
            }
        }

        // Função para limpar o formulário
        function limparFormulario() {
            document.getElementById('userId').value = '';
            document.getElementById('userName').value = '';
        }

        // Carrega os usuários ao iniciar
        carregarUsuarios();