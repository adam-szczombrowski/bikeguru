class HomeController < ApplicationController
  def index
    @cities = City.all
    @stations = City.find_by(name: 'Poznań').stations
    @favorite_stations = current_user&.stations || []
    @current_user = current_user
  end
end
