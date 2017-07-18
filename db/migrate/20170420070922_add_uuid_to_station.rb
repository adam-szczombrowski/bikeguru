class AddUuidToStation < ActiveRecord::Migration[5.0]
  def change
    add_column :stations, :uuid, :string
  end
end
