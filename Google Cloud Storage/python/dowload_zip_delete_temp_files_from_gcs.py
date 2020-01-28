#Import storage library
from google.cloud import storage
#Import os library to get current working directory path
import os
#Import zipfile library to zip files
import zipfile
#Import shutil library to delete directory and all its contents
import shutil

#Public variables:
bucket_name = BUCKET_NAME
tmpDirectoryName = 'temp'

#This function gets blob name as: "path/to/file.extension" and returns "file.extension"
def getFileName(blob_name):
    x = blob_name.split('/')
    return(x[len(x)-1])

#Get the current working directory
def getCurrentDirPath():
    cwd = os.getcwd()
    return cwd

#Get the path of the temporary direcotry within the curretn working directory.
#This will only return a string. Another function will check if it is exists or not and will create it accordingly
def getTempDirPath():
    cwd = os.getcwd()
    dir = str(cwd) + "/" + tmpDirectoryName
    return dir

#Create the temporary directory if it is not existed
def makeTempDir():
    dir = getTempDirPath()
    if not os.path.exists(dir):
        os.mkdir(dir)

#Download single file from GCS to local directory
def downloadFileFromGCS(source_blob_name, destination_file_name):
    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

    print("Blob {} downloaded to {}.".format(source_blob_name, destination_file_name))

#Itterate throug all the files in GCS and call the download function to download one by one file to local directory
def downloadFilesInTempDirectory():
    storage_client = storage.Client()
    blobs = storage_client.list_blobs(bucket_name)
    #Take one by one blob and analyze it
    for blob in blobs:
        #Get the blob name
        filename = getFileName(blob.name)
        #If this is '' then this is not a file but a directroy. Therefore skip it
        if filename != '':
            downloadFileFromGCS(blob.name, getTempDirPath() + "/" + filename)

#ZIP all the downloaded files in the temp directory
def zipFilesInTempDirectory():
    print('Creating archive with all the files in temp directory')

    filesInDirectory = os.listdir(getTempDirPath())

    filesInDirectoryWithPath = []

    for f in filesInDirectory:
        filesInDirectoryWithPath.append(getTempDirPath() + "/" + f)

    print(filesInDirectoryWithPath)

    with zipfile.ZipFile(getCurrentDirPath() + "/" + 'zipedFile.zip', 'w') as myzip:
        for f in filesInDirectoryWithPath: 
            print("Adding file: " + f)  
            myzip.write(f)

#Delete the temp directory with all the downloaded files
def delteTempDownloadedFiles():
    shutil.rmtree(getTempDirPath())

#Call each function to excecute different operations:
makeTempDir()
downloadFilesInTempDirectory()
zipFilesInTempDirectory()
delteTempDownloadedFiles()
