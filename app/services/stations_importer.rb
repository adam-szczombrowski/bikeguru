class StationsImporter
  def initialize(station:)
    @station = station
  end

  def import
    data = get_data
    create_stations(data)
  end

  private
  attr_reader :station

  def get_data
    uri = URI("https://api.citybik.es/v2/networks/#{station}")
    JSON.parse(Net::HTTP.get(uri))["network"]["stations"]
  rescue Net::ReadTimeout
    false
  end

  def create_stations(data)
    data.each do |d|
      Station.find_or_create_by(name: d["name"], long: d["longitude"], lat: d["latitude"])
    end
  end
end
