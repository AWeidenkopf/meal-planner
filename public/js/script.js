// alert('hello')
let addIngredientBtn = document.getElementById('addIngredientBtn')
let ingredientList = document.querySelector('.ingredientList')
let ingredientDiv = document.querySelectorAll('.ingredientDiv')

addIngredientBtn.addEventListener('click', function() {
  let newIngredient = ingredientDiv.cloneNode(true)
  let input = newIngredient.querySelector('ingredientInput')
  input.value = ''
  ingredientList.appendChild(newIngredient)
})
