class StationsUpdater
  def initialize(city:)
    @city_href = city.href
  end

  def update
    data, href = get_data
    update_stations(data)
  end

  private
  attr_reader :city_href

  def get_data
    url = "https://api.citybik.es#{city_href}"
    uri = URI(url)
    [JSON.parse(Net::HTTP.get(uri))["network"]["stations"], url]
  rescue Net::ReadTimeout
    false
  end

  def update_stations(data)
    data.each do |d|
      Station.find_by(name: d["name"]).update(free_bikes: d["free_bikes"])
    end
  end
end
