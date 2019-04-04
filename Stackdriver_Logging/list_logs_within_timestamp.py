# Imports the Google Cloud client library
import google.cloud.logging
#Import date and time library
import datetime

# Instantiates a client
client = google.cloud.logging.Client()

# Connects the logger to the root logging handler; by default this captures
# all logs at INFO level and higher
client.setup_logging()

#Starting point
date_a_str = '2019-04-03 01:00:00.000000'
date_a_obj = datetime.datetime.strptime(date_a_str, '%Y-%m-%d %H:%M:%S.%f')

#Ending point
date_b_str = '2019-04-04 23:00:00.000000'
date_b_obj = datetime.datetime.strptime(date_b_str, '%Y-%m-%d %H:%M:%S.%f')

#Use this filter for Cloud Function:
function_name = "[CLOUD_FUNCTIOn_NAME]"
FILTER = "resource.type=\"cloud_function\" AND resource.labels.function_name=\"" + function_name + "\" AND \"Function execution started\""

counter = 0

for entry in client.list_entries(filter_=FILTER):  # API call(s)
    #Get the entry's timestamp and convert to date time object
    date_str = str(entry.timestamp)
    date_str = date_str.replace("+00:00", "", 1)
    date_obj = datetime.datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S.%f')
    #Check if timestamp is within range and count it.
    if (date_a_obj < date_obj and date_obj < date_b_obj):
        counter = counter + 1


print("Found entries: " + str(counter))
