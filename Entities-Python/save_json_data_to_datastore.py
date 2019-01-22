from google.cloud import datastore
import json

#The JSON file
data = {
  "food": [
    { "food_name":"NAME1", "food_price":"PRICE1" },
    { "food_name":"NAME2", "food_price":"PRICE2" },
    { "food_name":"NAME3", "food_price":"PRICE3" }
  ],
  "beverages":[
    { "beverage_name":"NAME1", "beverage_price":"PRICE1" },
    { "beverage_name":"NAME2", "beverage_price":"PRICE2" }
  ]
 }

#Load the JSON string to go through data
json_string = json.dumps(data)
data = json.loads(json_string)

#Create a client to connect with Google Datastore
client = datastore.Client()

#Set the key kind for food
key = client.key("food")

#Add all food to datastore:
#Count all available food records
count_foods = len(data["food"])

for x in range(count_foods):
    entity_foods = datastore.Entity(key=key)
    entity_foods["food_name"] = data["food"][x]["food_name"]
    entity_foods["food_price"] = data["food"][x]["food_price"]
    client.put(entity_foods)


#Set the key kind for beverages
key = client.key("beverages")

#Add all beverages to datastore
#Count all available beverage records
count_beverages = len(data["beverages"])

for x in range(count_beverages):
    entity_beverages = datastore.Entity(key=key)
    entity_beverages["beverage_name"] = data["beverages"][x]["beverage_name"]
    entity_beverages["beverage_price"] = data["beverages"][x]["beverage_price"]
    client.put(entity_beverages)



