from google.cloud import datastore
import datetime

ENTITY_KIND = 'ENTITY_KIND_NAME'
ENTITY_KEY = 0 #If numeric use without quotes
ENTITY_COLUMN_1 = 'ENTITY_COLUMN_1'
ENTITY_COLUMN_2 = 'ENTITY_COLUMN_2'

def updateDatastore(request):
    
    #Set the current time as the new value for that entry
    updateEntity( str( datetime.datetime.now().time() ) )
    
    request_json = request.get_json()
    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return f'Succesfully updated!'

    
def updateEntity(value):
    client = datastore.Client()
    
    COLUMN_1 = 'name'
    COLUMN_2 = value

    key = client.key(ENTITY_KIND, ENTITY_KEY)
    e = client.get(key)

    e[ENTITY_COLUMN_1] = COLUMN_1
    e[ENTITY_COLUMN_2] = COLUMN_2
    
    client.put(e)
    

