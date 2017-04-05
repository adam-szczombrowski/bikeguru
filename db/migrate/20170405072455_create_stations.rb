class CreateStations < ActiveRecord::Migration[5.0]
  def change
    create_table :stations do |t|
      t.string :name
      t.float :lat
      t.float :long
      t.integer :bikes

      t.timestamps
    end
  end
end
