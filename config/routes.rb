Rails.application.routes.draw do
  get :index, to: 'search#index'
  get :search, to: 'search#search', defaults: { format: 'json' }

  root 'search#index'
end
