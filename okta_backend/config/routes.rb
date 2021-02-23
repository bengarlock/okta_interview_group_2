Rails.application.routes.draw do

  resources :okta_groups
  resources :okta_users
  namespace :api do
    namespace :v1 do
      resources :users
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
    end
  end

end
