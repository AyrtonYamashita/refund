const form = document.querySelector("form")
const ipt_amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")


// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (e) => {
  // Previne o comportamento padrão de fazer reload na página
  e.preventDefault()

  // Cria um objeto com os valores nos campos do formulário
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: ipt_amount.value,
    created_at: new Date(),
  }

  // Chama a função de irá adicionar o item na lista
  expenseAdd(newExpense)
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

function formatCurrentBRL(value) {

  // Formata o valor no padrão BRL REAL BRASILEIRO
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  // Retorna o valor formatado
  return value
}

function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Adiciona as informações no item
    expenseItem.append(expenseIcon)
    expenseList.append(expenseItem)

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}