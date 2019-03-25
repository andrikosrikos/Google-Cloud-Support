from google.cloud import storage

BUCKET_NAME = "[BUCKET_NAME]"

def list_blobs(bucket_name):
    """Lists all the blobs in the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)

    blobs = bucket.list_blobs()

    for blob in blobs:
        print ("Processing object: " + str(blob.name))
        blob_metadata(bucket_name, blob.name)

def blob_metadata(bucket_name, blob_name):
    """Prints out a blob's metadata."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.get_blob(blob_name)
    """
    print('Blob: {}'.format(blob.name))
    print('Bucket: {}'.format(blob.bucket.name))
    print('Storage class: {}'.format(blob.storage_class))
    print('ID: {}'.format(blob.id))
    print('Size: {} bytes'.format(blob.size))
    print('Updated: {}'.format(blob.updated))
    print('Generation: {}'.format(blob.generation))
    print('Metageneration: {}'.format(blob.metageneration))
    print('Etag: {}'.format(blob.etag))
    print('Owner: {}'.format(blob.owner))
    print('Component count: {}'.format(blob.component_count))
    print('Crc32c: {}'.format(blob.crc32c))
    print('md5_hash: {}'.format(blob.md5_hash))
    print('Cache-control: {}'.format(blob.cache_control))
    print('Content-type: {}'.format(blob.content_type))
    print('Content-disposition: {}'.format(blob.content_disposition))
    print('Content-encoding: {}'.format(blob.content_encoding))
    print('Content-language: {}'.format(blob.content_language))
    """
    
    if (str(blob.metadata) != "None"):
        #Do some operations
        print('Metadata: {}'.format(blob.metadata))
    

    """
    print("Temporary hold: ",
          'enabled' if blob.temporary_hold else 'disabled')
    print("Event based hold: ",
          'enabled' if blob.event_based_hold else 'disabled')
    if blob.retention_expiration_time:
        print("retentionExpirationTime: {}"
              .format(blob.retention_expiration_time))
    """

list_blobs(BUCKET_NAME)
