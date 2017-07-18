class AddHrefToStation < ActiveRecord::Migration[5.0]
  def change
    add_column :stations, :href, :string
  end
end
