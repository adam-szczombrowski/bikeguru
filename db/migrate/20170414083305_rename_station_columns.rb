class RenameStationColumns < ActiveRecord::Migration[5.0]
  def change
    rename_column :stations, :lat, :latitude
    rename_column :stations, :long, :longitude
    rename_column :stations, :bikes, :free_bikes
  end
end
