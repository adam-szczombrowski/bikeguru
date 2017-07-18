Rails.application.routes.draw do
  devise_for :users do
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'home', to: 'home#index', as: :home_index
  post 'favorite/:id', to: 'stations#favorite', as: :favorite_station
  get 'stations/:city_name', to: 'stations#show', as: :get_stations
  delete 'remove/:id', to: 'stations#remove', as: :remove_station
  root 'home#index'
end
