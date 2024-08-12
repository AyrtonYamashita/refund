const ipt_amount = document.querySelector("#amount")


ipt_amount.oninput = () => {
  let value = ipt_amount.value.replace(/\D/g, "");
  ipt_amount.value = value
}