class CreateOktaGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :okta_groups do |t|

      t.timestamps
    end
  end
end
