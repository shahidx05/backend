const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const foodItems = [
  { id: 1, food: "Burger", category: "Non-Veg", price: 120 },
  { id: 2, food: "Pizza", category: "Veg", price: 250 },
  { id: 3, food: "Pasta", category: "Veg", price: 200 },
  { id: 4, food: "Chicken Biryani", category: "Non-Veg", price: 180 },
  { id: 5, food: "Veg Sandwich", category: "Veg", price: 90 },
  { id: 6, food: "Paneer Dosa", category: "Veg", price: 70 },
  { id: 7, food: "Paneer Butter Masala", category: "Veg", price: 220 },
  { id: 8, food: "Chicken Noodles", category: "Non-Veg", price: 150 },
  { id: 9, food: "Egg Fried Rice", category: "Non-Veg", price: 160 },
  { id: 10, food: "Ice Cream", category: "Veg", price: 80 }
];

const AddToCart = [];

app.get('/food', (req, res) => {
  res.status(200).send(foodItems)
})

app.use("/admin", (req, res, next) => {
  const token = req.headers.authorization
  if (token !== "ABCD") {
    return res.status(403).send("Access Denied")
  }
  next()
})

app.post("/admin", (req, res) => {
  foodItems.push(req.body)
  res.status(201).send("item added successfully")
})

app.delete("/admin/:id", (req, res) => {
  const { id } = req.params

  const idx = foodItems.findIndex(e => e.id == id)

  if (idx === -1) {
    return res.status(404).send("Item Doesn't Exist")
  }
  foodItems.splice(idx, 1)
  res.status(200).send("deleted Successfylly")
})

app.patch('/admin', (req, res) => {
  const { id, food, price, category } = req.body

  const item = foodItems.find(f => f.id == id)
  if (!item) return res.status(404).send("Food not found")

  if (food) item.food = food
  if (price) item.price = price
  if (category) item.category = category

  res.send(item)
})

app.post('/user/:id', (req, res)=>{
  const {id} = req.params
  const food = foodItems.find(e=>e.id==id)
  if(!food){
    return res.status(404).send("food not Exist")
  }
  AddToCart.push(food)
  res.status(200).send("Item added successfully")
})

app.delete('/user/:id', (req, res)=>{
  const {id} = req.params
  const idx = AddToCart.find(e=>e.id==id)
  if(idx==-1){
    return res.status(404).send("food not Exist")
  }
  AddToCart.splice(idx, 1)
  res.status(200).send("Item removed successfully")
})

app.get('./user', (req, res)=>{
  res.status(200).send(AddToCart)
})



app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
