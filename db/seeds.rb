# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

##Create Months
december22 = Month.create(month_num: 12, month_desc: "December", year: 2022)
january = Month.create(month_num: 01, month_desc: "January", year: 2023)
february23 = Month.create(month_num: 02, month_desc: "February", year: 2023)
# march23 = Month.create(month_num: 03, month_desc: "March", year: 2023)
# april23 = Month.create(month_num: 04, month_desc: "April", year: 2023)
# may23 = Month.create(month_num: 05, month_desc: "May", year: 2023)

### Create Categories
groceries = Category.create(description: "Groceries")
rent = Category.create(description: "Housing")
clothing = Category.create(description: "shopping")


### Create Users
# jane = User.create(first_name: "Jane", last_name: "Doe", email: "jane@jane.com", password_digest:'1234')


### Create Budgets
# march_budget = kat.budgets.create(amount: 2000.00, month_id: march23.id)
# april_budget = kat.budgets.create(amount: 2400.00, month_id: april23.id)



### Create Transactions
# march_budget.transactions.create(description: "whole foods groceries", amount: 58.20, date_created: "2022-12-01", category_id: 13)
# march_budget.transactions.create(description: "may rent", amount: 1750.00, date_created: "2022-12-02", category_id: 14)
# march_budget.transactions.create(description: "trader joes groceries", amount: 66.25, date_created: "2022-12-08", category_id: 13)
# april_budget.transactions.create(description: "june rent", amount: 1750.00, date_created: "2022-12-01", category_id: 14)

