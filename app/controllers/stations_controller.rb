class StationsController < ApplicationController
  def show
    @city = City.find_by(name: params[:city_name])
    StationsUpdater.new(city: @city).update
    render json: @city.stations
  end

  def favorite
    @station = Station.find(params[:id])
    if current_user.present? && current_user.stations.exclude?(@station)
      current_user.stations << @station
      answer = @station
    else
      answer = nil
    end
    render json: answer
  end

  def remove
    @station = Station.find(params[:id])
    User.first.stations.delete(@station)
    render json: @station
  end
end
