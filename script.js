const formulario = document.querySelector("form");
const inputNome = document.querySelector(".nome");
const inputEmail = document.querySelector(".email");
const inputIdade = document.querySelector(".idade");

function cadastrar(){
    
    fetch("http://localhost:8080/cadastrar", 
        {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: inputNome.value,
                email: inputEmail.value,
                idade: inputIdade.value
            })
        }
    )
    .then(function(res){console.log(res)})
    .catch(function(res){console.log(res)})

    };
function limpar(){
        inputNome.value = ""
        inputEmail.value = ""
        inputIdade.value =""
    }

formulario.addEventListener('submit', function(event){
    event.preventDefault();

    cadastrar()
    limpar()
})