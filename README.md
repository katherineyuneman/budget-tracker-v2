# Budget Tracker 2

## Description

Ruby on Rails and Active Record API with PostgreSQL Database  to support a React frontend

Budget Tracker is a web app that allows you to add a new monthly budget limit.  You can also add how much you spend during any budget month in the form of individual itemized transactions.

Only one Budget can be added per month, but a month and budget can have many different transactions related to it.  You can view your budget summary for the month by going to the My Dashboard section to see how much you've spent (Total Sum of all of your month's transactions) and how much you have left for the month depending on your budget.

Jane Doe is the example user.  There are no signin or user creation features at this time.

# Link Respository
https://github.com/katherineyuneman/budget-tracker-v2

# Deployed Application on Render
https://budget-tracker-k2k9.onrender.com/

# Notes
This app was formerly in a different repository as a Sinatra API connected to a Rect frontend.  This was migrated over to a new app with a Ruby on Rails API.

## Example API Endpoints:

All budgets
`/budgets`

All transactions
`/transactions`

Individual Month's Budget by Month Description
`/budgetsummary/May`

Individual Budget by Budget ID
`/budgets/14`

Sum of Individual Budget Month's Transactions
`/budgets/14/May/transactions/sum`

Last 5 Transactions Created
`/transactions`

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Render account
- Postgresql

See Environment Setup below for instructions on installing these tools if you
don't already have them.

## Installation

Run:

bundle install
rails db:create
npm install --prefix client

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)


#### Postgresql Installation for OSX

To install Postgres for OSX, you can use Homebrew:

```sh
brew install postgresql
```

Once Postgres has been installed, run this command to start the Postgres
service:

```sh
brew services start postgresql
```

## Resources
The charts utilized were from the Recharts library.

Styled Components used to style application.

## Contributing
Pull requests are welcome.

## License
[MIT](https://choosealicense.com/licenses/mit/)
