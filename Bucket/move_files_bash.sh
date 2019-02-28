#This bash script will:
# 1. Get the name of each object from "gs://[BUCKET_NAME]/from" bucket folder.
# 2. Copy all objects from "gs://[BUCKET_NAME]/from" bucket folder to the "gs://[BUCKET_NAME]/to/" bucket folder
# 3. Delete all objects from "gs://[BUCKET_NAME]/from" bucket folder

#Create an array that will list all the objects in the bucket
move_from_array=( $(gsutil ls gs://[BUCKET_NAME]/from) )

#Create a variable for the destination folder
move_to="gs://[BUCKET_NAME]/to/"

for object_link in "${move_from_array[@]}"
do
   #Get only the object name
   #Since we are copying from a known path, we just need to replace the path with null to get the file name only
   #The command to replace string works like:
   # firstString="This is a test message"
   # secondString="example"
   # echo "${firstString/message/$secondString}" => prints 'This is a test example'
   #               ^        ^          ^
   #               |        |          |Replace with this string
   #               |        | Find this string
   #               | Replace from this string
   # Since GCS bucket link has "/" symbol we need to skip them so for each "/" symbol we have to add anoter "\" before it
   # Therfore the "gs://[BUCKET_NAME]/to/" will look like this => "gs:\/\/[BUCKET_NAME]\/from\/"            
   object_name=${object_link/gs:\/\/[BUCKET_NAME]\/from\//}
   
   #Since "gsutil ls" command will return also the folder it self
   #Running the above command will give us the first object_name to be NULL
   #Before copying or deleting any object, first make sure that object_name is not NULL
   if [ ! -z ${object_name} ]
   then
    #Copy to the new location
    $(gsutil cp $object_link $move_to${object_name})
    echo "Copying object: ${object_name}"

    #Delete the object from the bucket
    $(gsutil rm $object_link)
    echo "Deleted object: ${object_name}"
   fi
done


   


