Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/users', to: 'users#index'

  get '/budgetsummary/:month_desc', to: 'budgets#budget_summary'
  get '/budgetsummary/:month_desc/max_spend', to: 'budgets#max_spend'
  get '/transactions/recent', to: 'transactions#recent'
  get '/budgets/:id/transactions', to: 'transactions#budget_transactions'
  get '/budgets/:id/transactions/sum', to: 'transactions#transactions_sum'

  resources :budgets
  resources :transactions
  resources :months, only: [:index]
  resources :categories, only: [:index]


end
