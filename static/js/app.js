import { env } from "../../env.js";

const chat = document.querySelector('#chat');
const input = document.querySelector('#input');
const botaoEnviar = document.querySelector('#botao-enviar');
const botaoLimpar = document.querySelector('#botao-limpar-conversa');

botaoEnviar.addEventListener('click', enviarMensagem);
botaoLimpar.addEventListener('click', limparConversa)

input.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        botaoEnviar.click();
    }
});

document.addEventListener('DOMContentLoaded', vaiParaFinalDoChat);

async function enviarMensagem() {
    if (input.value == '' || input.value == null) return;

    const message = input.value;
    input.value = '';

    const novaBolha = criaBolhaUsuario();
    novaBolha.innerHTML = message;
    chat.appendChild(novaBolha);

    try {
        const response = await fetch(env.API_URL + '/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();

        let novaBolhaBot = criaBolhaBot();
        chat.appendChild(novaBolhaBot);
        vaiParaFinalDoChat();
        novaBolhaBot.innerHTML = data.response;
        vaiParaFinalDoChat();
    } catch (error) {
        alert(error);
    }
}

function criaBolhaUsuario() {
    const bolha = document.createElement('p');
    bolha.classList = 'chat__bolha chat__bolha--usuario';
    return bolha;
}

function criaBolhaBot() {
    let bolha = document.createElement('p');
    bolha.classList = 'chat__bolha chat__bolha--bot';
    bolha.innerHTML = '<div class="loader"></div>'
    return bolha;
}

function vaiParaFinalDoChat() {
    chat.scrollTop = chat.scrollHeight;
}

function limparConversa() {
    location.reload();
}
