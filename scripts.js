const form = document.querySelector("form")
const ipt_amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

form.onsubmit = (e) => {
  e.preventDefault()
}

// Captura o evento de input para formatar o valor.
ipt_amount.oninput = () => {
  // Captura o valor do input e remove caracteres não númericos
  let value = ipt_amount.value.replace(/\D/g, "");

  // Transformar o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$ 1,50)
  value = Number(value) / 100

  // Atualiza o valor do input sem caracteres não numéricos.
  ipt_amount.value = formatCurrentBRL(value)
}

function formatCurrentBRL(value){

  // Formata o valor no padrão BRL REAL BRASILEIRO
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  // Retorna o valor formatado
  return value
}