class StationsImporter
  def import
    City.all.each do |city|
      data, href = get_data(city.href)
      create_stations(data, href, city.id)
    end
  end

  private

  def get_data(city_href)
    url = "https://api.citybik.es#{city_href}"
    uri = URI(url)
    [JSON.parse(Net::HTTP.get(uri))["network"]["stations"], url]
  rescue Net::ReadTimeout
    false
  end

  def create_stations(data, href, city_id)
    data.each do |d|
      Station.create(
        name: d["name"],
        longitude: d["longitude"],
        latitude: d["latitude"],
        free_bikes: d["free_bikes"],
        href: href,
        city_id: city_id
      )
    end
  end
end
