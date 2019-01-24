from flask import Flask
from google.cloud import storage

app = Flask(__name__)

bucket_name = '[BUCKET_NAME]'

storage_client = storage.Client()
bucket = storage_client.get_bucket(bucket_name)

@app.route('/')
def hello():
    return 'Main'


@app.route('/list_blobs')
def list_blobs():
    blobs = bucket.list_blobs()
    blob_str = ""
    for blob in blobs:
        blob_str = blob_str + blob.name + " *** "

    return 'Blobs: ' + blob_str

@app.route('/delete_blob')
def delete_blob():
    
    blob_name = '[PATH/TO/OBJECT/OBJECT_NAME]'
    blob = bucket.blob(blob_name)
    blob.delete()
    
    return 'DONE!'
         
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
