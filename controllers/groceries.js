import { Ingredient} from '../models/ingredient.js'

function index(req, res) {
    res.render('groceries/index', {
    title: 'Grocery List',
  })
}

export {
  index
}
