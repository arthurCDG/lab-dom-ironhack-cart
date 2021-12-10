// ITERATION 1

function updateSubtotal(product) {
  const price = product.querySelector('.price span').innerHTML;
  const quantity = product.querySelector('.quantity input').value;
  const subTotalprice = price * quantity;
  return subTotalprice;
}

function calculateAll() {
  let totalPrice = 0;

  const allProducts = document.getElementsByClassName('product');
  Array.from(allProducts).forEach((product) => {
    const subTotal = product.querySelector('.subtotal span');
    subTotal.innerHTML = updateSubtotal(product);
    totalPrice += updateSubtotal(product);
  });

  const totalPriceDOMElement = document.querySelector('#total-value span');
  totalPriceDOMElement.innerHTML = totalPrice;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  // Target the body and remove the row that has the button
  target.parentNode.parentNode.parentNode.removeChild(
    target.parentNode.parentNode
  );
  // Update the total
  calculateAll();
}

// ITERATION 5

function createProduct() {
  /* -------------- LE MASTODONTE QUI FAIT BIEN PEUR (prenez un petit advil avant de le lire) --------------------------- */

  // En plus d'être indigeste, ce code présente deux problèmes :
  // ligne 60 j'essaie de récupérer la valeur du prix de l'élément mais ça renvoie zéro
  // Et je n'ai pas réussi à réattacher chaque nouvelle ligne aux fonctions de calcul de sous-total
  // Tout ça pour ça, comme dirait le poète

  // Target the name and unit price input DOM nodes and extract their value
  let productName = document.querySelector("input[type='text']").value;
  let unitaryPrice = document.querySelector("input[type='number']").value;
  // Add a new row to the table
  const newRow = document.createElement('tr');
  const tbody = document.querySelector('tbody');
  tbody.appendChild(newRow);
  // Add the product name and unitary price in tds to the new row with the good classes and with the inner spans
  const newNameCell = document.createElement('td');
  newNameCell.classList.add('name');
  const newSpan1 = document.createElement('span');
  newSpan1.innerHTML = productName;
  newNameCell.appendChild(newSpan1);
  const newPriceCell = document.createElement('td');
  newPriceCell.classList.add('price');
  newPriceCell.innerText = '$';
  const newSpan2 = document.createElement('span');
  newSpan2.innerHTML = unitaryPrice;
  newPriceCell.appendChild(newSpan2);
  newRow.appendChild(newNameCell);
  newRow.appendChild(newPriceCell);
  // Add as well to this row the quantity input, the subtotal and remove button
  const newQuantityInputCell = document.createElement('td');
  newQuantityInputCell.classList.add('quantity');
  const newQuantityInput = document.createElement('input');
  newQuantityInput.type = 'number';
  newQuantityInput.value = '0';
  newQuantityInput.min = '0';
  newQuantityInput.placeholder = 'Quantity';
  newQuantityInputCell.appendChild(newQuantityInput);
  const newSubTotalCell = document.createElement('td');
  newSubTotalCell.classList.add('subtotal');
  newSubTotalCell.innerText = '$';
  const newSPan3 = document.createElement('span');
  newSPan3.innerText = 0;
  newSubTotalCell.appendChild(newSPan3);
  const newRemoveBtnCell = document.createElement('td');
  newRemoveBtnCell.classList.add('action');
  //Create a button, add the correct class and set its inner-content to remove
  const newRemoveButton = document.createElement('button');
  newRemoveButton.classList.add('btn', 'btn-remove');
  newRemoveButton.innerText = 'Remove';
  newRemoveBtnCell.appendChild(newRemoveButton);
  newRow.appendChild(newQuantityInputCell);
  newRow.appendChild(newSubTotalCell);
  newRow.appendChild(newRemoveBtnCell);
  // Re-attach the event listener
  newRemoveButton.addEventListener('click', removeProduct);
  // Clear the input fields in the creation form
  productName = '';
  unitaryPrice = '';

  /* ----------------------------------------------------------*/
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removePricesBtn = document.getElementsByClassName('btn-remove');
  Array.from(removePricesBtn).forEach((button) => {
    button.addEventListener('click', removeProduct);
  });

  const createBtn = document.querySelector('#create');
  createBtn.addEventListener('click', createProduct);
});
