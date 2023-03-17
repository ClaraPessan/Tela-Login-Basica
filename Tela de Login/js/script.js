const formulario = document.querySelector('form');
const botaoEnviar = document.querySelector('button[type="submit"]');

function mostrarSenha() {
  var senha = document.getElementById("password");
  var olho = document.getElementById("olho-senha");
  if (senha.type === "password") {
      senha.type = "text";
      olho.classList.add("mostrar");
  } else {
      senha.type = "password";
      olho.classList.remove("mostrar");
  }
}

formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = formulario.querySelector('#username').value;
  const password = formulario.querySelector('#password').value;

  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === 'Invalid credentials') {
        const alertMensagem = document.createElement("div")
        alertMensagem.classList.add('alert', 'alert-erro')
        alertMensagem.innerText = 'Nome de usuário ou senha incorretos. Tente novamente.'
        document.body.appendChild(alertMensagem)

        setTimeout(() => {
          alertMensagem.remove();
        }, 2000);

    } else {
        const alertMensagem = document.createElement("div")
        alertMensagem.classList.add('alert', 'alert-correto')
        alertMensagem.innerText = 'Login realizado com sucesso'
        document.body.appendChild(alertMensagem)

        setTimeout(() => {
          alertMensagem.remove();
        }, 2000);
        formulario.reset()
    }
    console.log(data);
  });
});
