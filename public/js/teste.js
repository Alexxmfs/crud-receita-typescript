let frases = [
    "carros",
    "esportes",
    "programação"
]

let index = 0
let fraseElement = document.getElementById("frases")

function exibirProximaFrase() {
    fraseElement.innerHTML = frases[index]
    index++

    if (index >= frases.length) {
    index = 0
    }

    setTimeout(function() {
    fraseElement.innerHTML = ""
    setTimeout(exibirProximaFrase, 1000)
    }, 2000); 
}

exibirProximaFrase();