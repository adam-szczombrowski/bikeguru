class CitiesImporter
  def import
    data = get_data
    create_cities(data)
  end

  private

  def get_data
    uri = URI("https://api.citybik.es/v2/networks/")
    JSON.parse(Net::HTTP.get(uri))["networks"]
  rescue Net::ReadTimeout
    false
  end

  def create_cities(data)
    data.each do |d|
      City.find_or_create_by(
        name: d["location"]["city"],
        href: d["href"],
        lat:  d["location"]["latitude"],
        long: d["location"]["longitude"]
      )
    end
  end
end
