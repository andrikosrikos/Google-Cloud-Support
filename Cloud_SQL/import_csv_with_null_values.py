# importing CSV file with NULL values in the MySQL number field will write 0 or 0.0 instead of NULL
# This code is writing the NULL value properly if the imported value is NULL
# Using Python 3

# Import CSV library to read CSV files
import csv
import pymysql

# Connection to database variables
db_user = 'USER'
db_password = 'PASSWORD'
db_name = 'DATABASE_NAME'
db_connection_name = 'CLOUD_SQL_CONNECTION_NAME'
host = '127.0.0.1'

# Initiate the client that connects to the database
cnx = pymysql.connect(user=db_user, password=db_password, host=host, db=db_name)

# Additional public variables 
fileName = "/path/to/csv/file.csv"
tableName = "TABLE_NAME"

# This function is getting an array with data and generates the equivalent query string that needs to be executed to insert the data to the database
def getQuery(row):
    query = "INSERT INTO " + tableName + " VALUES ("

    total = len(row) # The total amount of data to generate the query string for
    index = 0 # Current index that we see in the row
    # Everytime we read one field we put "," at the end to sperate the fields
    # However last filed don't need the "," otherwise it will fail
    # So we have to check if the filed we are reading is the last on in orded to PUT the "," at the end or not

    # Itterate through all the data in the array
    for r in row:
        # It means that it is the last field so don't add "," at the end
        if index == total - 1:
            # Check if the field is NULL and if it is then add NULL at the end to make sure that Cloud SQL will insert NULL value in that field
            if r == "":
                query = query + "NULL"
            else:
                query = query + "'" + r + "'"
        else:
            # Check if the field is NULL and if it is then add NULL at the end to make sure that Cloud SQL will insert NULL value in that field
            if r == "":
                query = query + "NULL , "
            else:
                query = query + "'" + r + "', "

        # Increase the index number since we are reading the next field in the next itteration
        index = index + 1
    # Close the quert properly and return it
    query = query + ");"
    return(query)


# This function will execute the query to insert data to the database
def insertToDatabase(query):
    # Use the initiated client connection
    cursor = cnx.cursor()
    # Get the query and commit
    result = cursor.execute(query)
    cnx.commit()

    # If the result is 1 then the execution was succssful otherwise it failed
    if result == 1:
        print("Data was added to the database ...")
    else:
        print("Data was NOT added ...")
    
# Read the CSV file
with open(fileName) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0

    # Create an array to store the column names
    # This is optional in this example but you can use the data later if you need
    columnNames = []

    # Itterate through each row of the document
    for row in csv_reader:
        # If this is the first line then it is the column's names
        if line_count == 0:
            # Get the columns names in the array for later use
            columnNames = row
            line_count += 1
        else:
            # This line has the data to be insterted to the Cloud SQL instance
            # Exeute the function to generate the query string and then get the response and execute the function that will insert the data to the database
            insertToDatabase(getQuery(row))
            line_count += 1

    print(f'Processed {line_count} lines.')
