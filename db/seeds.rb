# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

### Create Users
kat = User.create(first_name: "Kat", last_name: "Jussen", email: "kat@kat.com", password_digest:'1234')

### Create Budgets
may_budget = kat.budgets.create(amount: 2000.00, month: "May")
june_budget = kat.budgets.create(amount: 2400.00, month: "June")

### Create Categories
groceries = Category.create(description: "groceries")
rent = Category.create(description: "rent")
clothing = Category.create(description: "shopping")


### Create Transactions
may_budget.transactions.create(description: "whole foods groceries", amount: 58.20, date_created: "2022-05-01", category_id: 13)
may_budget.transactions.create(description: "may rent", amount: 1750.00, date_created: "2022-05-02", category_id: 14)
may_budget.transactions.create(description: "trader joes groceries", amount: 66.25, date_created: "2022-05-08", category_id: 13)
june_budget.transactions.create(description: "june rent", amount: 1750.00, date_created: "2022-06-01", category_id: 14)

