Rails.application.routes.draw do
  get :index, to: 'search#index'

  root 'search#index'
end
