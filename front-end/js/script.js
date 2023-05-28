const inputCep = document.getElementById('cep-value')

//Pegando a data atual
let data = new Date
let dia = data.getDate()
let mes = (data.getMonth()) + 1
if (mes.toString().length == 1) {
    mes = '0' + mes
} else if (dia.toString().length == 1) {
    dia = '0' + dia
}
let ano = data.getFullYear()


document.getElementById("btn-agendar").value = "";

inputCep.addEventListener('keypress', (tecla) => {
    //Somente núemros
    if (isNaN(tecla.key)) {
        tecla.preventDefault() 
    }
    //Adiciona um "-" depois 5° palavra 
    inputCep.value = inputCep.value.replace(/^(\d{5})(\d)/,"$1-$2")    
})