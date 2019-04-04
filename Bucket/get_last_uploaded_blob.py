from google.cloud import storage
import datetime

bucket_name = "[BUCKET_NAME]"

def list_blobs():
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)

    blobs = bucket.list_blobs()

    #Define a date that is very old as starting point. 
    #It is unlikely to have a blob with this date as upload date.
    #Convert the format to date_time_object
    date_time_str = '1900-01-01 00:00:00.000000'
    date_time_obj = datetime.datetime.strptime(date_time_str, '%Y-%m-%d %H:%M:%S.%f')

    #Use this variable to store the blob's name with prefix when you find it
    #It will remain "NO BLOB FOUND" in case the bucket is empty
    #Or if there is at least one file in the bucket then you will get the files prefix and name
    #Somehting like "this/is/directory/file.txt"
    latest_blob = "NO BLOB FOUND"

    #Get the name of each blob in the Google Cloud Storage bucket
    for blob in blobs:
        #Get each blob's latest update time and convert it to string
        new_date = str(blob_metadata(blob.name))
        #The blob's update timestamp has always +00:00 at the end to specify the zone. So replace it with nothing, since the format we are using doesn't have that part
        new_date = new_date.replace("+00:00", "", 1)
        print("Processing: " + str(blob.name) + " with latest update date: " + new_date)
        #Convert the loaded date string to date_time_object
        new_date_obj = datetime.datetime.strptime(new_date, '%Y-%m-%d %H:%M:%S.%f')
        #If it is greater than the one we have already saved
        #Update the blob's name and the latest update time
        #Otherwise don't do anytihng
        if(new_date_obj > date_time_obj):
            date_time_str = new_date
            date_time_obj = datetime.datetime.strptime(new_date, '%Y-%m-%d %H:%M:%S.%f')
            latest_blob = blob.name

    #After that, thses variables will have the latest' blob's name with prefix and its date time stamp.
    print("Latest blob: " + latest_blob)
    print("Latest blob's upload date: " + date_time_str)

def blob_metadata(blob_name):
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.get_blob(blob_name)
    #The updated metadata of the blob is the latest time it was modified, which means uploaded OR the metadata
    return(blob.updated)

list_blobs()
