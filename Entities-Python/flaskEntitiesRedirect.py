#To test the code
#Run python code
#Navigate to /add 
#Test if added by navigating to /get
#Test the update by navigating to /update
#After the update is executed the program will navigate automatically to /get to show you the updated result

from flask import Flask, redirect, url_for
from google.cloud import datastore

app = Flask(__name__)

ENTITY_KIND = 'ENTITY_KIND'
ENTITY_KEY = 0 #If numeric use without quotes
ENTITY_COLUMN_1 = 'ENTITY_COLUMN_1'
ENTITY_COLUMN_2 = 'ENTITY_COLUMN_2'

def addNew(num):
    client = datastore.Client()
    
    COLUMN_1 = 'name'
    COLUMN_2 = num

    key = client.key(ENTITY_KIND)

    entity = datastore.Entity(key=key)
    entity[ENTITY_COLUMN_1] = COLUMN_1
    entity[ENTITY_COLUMN_2] = COLUMN_2

    client.put(entity)

def updateEntity(num):
    client = datastore.Client()
    
    COLUMN_1 = 'name'
    COLUMN_2 = num

    key = client.key(ENTITY_KIND, ENTITY_KEY)
    e = client.get(key)

    e[ENTITY_COLUMN_1] = COLUMN_1
    e[ENTITY_COLUMN_2] = COLUMN_2
    
    client.put(e)


@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/add')
def add():
    addNew('2')
    return 'New entity added!'

@app.route('/update')
def update():
    client = datastore.Client()
    key = client.key(ENTITY_KIND, ENTITY_KEY)
    e = client.get(key)
    
    num = e[ENTITY_COLUMN_2]
    
    num = int(num) + 1
    updateEntity(str(num))
    
    #return str(num)
    return redirect(url_for('get'))

@app.route('/get')
def get():
    client = datastore.Client()
    key = client.key(ENTITY_KIND, ENTITY_KEY)
    e = client.get(key)
    num = e[ENTITY_COLUMN_2]
    
    return "Getting number " + num

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
