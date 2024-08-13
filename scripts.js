// Seleciona os elementos do formulário
const form = document.querySelector("form")
const ipt_amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")


// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")


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
  // Formata o valor da despesa para o padrão real brasileiro


}

// Formata o valor para a moeda brasileira
function formatCurrentBRL(value) {

  // Formata o valor no padrão BRL REAL BRASILEIRO
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  // Retorna o valor formatado
  return value
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a informação da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona nome e categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.toUpperCase().replace("R$", "")}`

    // Cria o ícone de remover
    const expenseDelete = document.createElement("img")
    expenseDelete.classList.add("remove-icon")
    expenseDelete.setAttribute("src", "./img/remove.svg")
    expenseDelete.setAttribute("alt", "Remover despesa")

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseDelete)

    // Adiciona o item na lista
    expenseList.append(expenseItem)

    // Atualiza os totais
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}

// Atualiza os totais
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children

    // Atualiza a quantidade de itens da lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`


    // Variável para incrementar o total.
    let total = 0

    // Percorre cada item (li) da lista (ul)
    for (let i = 0; i < items.length; i++) {
      const itemAmount = items[i].querySelector(".expense-amount")

      // Remove caracteres não numéricos e substitui a virgula por ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      // Converte o valor para float
      value = parseFloat(value)

      // Verifica se é um número válido
      if (isNaN(value)) {
        return alert("Não foi possível calcular o total. O valor não parece ser um número...")
      }

      // Incrementar o valor total
      total += Number(value)
    }

    // Cria a span para adicioanr o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
    total = formatCurrentBRL(total).toUpperCase().replace("R$", "")

    // Limpa o conteúdo do elemento
    expensesTotal.innerHTML = ""

    // Adiciona o simbolo da moeda e o valor total formatado
    expensesTotal.append(symbolBRL, total)
  } catch (error) {
    alert("Não foi possível atualizar os totais")
    console.log(error)
  }
}

// Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", (e) => {
  // Verificando se o elemento clicado é o ícone de remover
  if (e.target.classList.contains("remove-icon")) {
    // Obtém a li pai do elemento clicado
    const item = e.target.closest(".expense")

    // Remove o item pai da despesa
    item.remove()
  }

  // Atualiza a lista de despesas
  updateTotals()

})