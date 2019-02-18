# Importa pandas library for inmporting CSV
import pandas as pd 

# Imports the Google Cloud client library
from google.cloud import translate

# Instantiates a client
translate_client = translate.Client()

#Translating the text to specified target language
def translate(word):
    # Target language
    target_language = 'ru' #Add here the target language that you want to translate to
    # Translates some text into Russian
    translation = translate_client.translate(
        word,
        target_language=target_language)

    return (translation['translatedText'])

#Import data from CSV
def importCSV():
    data = pd.read_csv('PATH/TO/THE/CSV/FILE/FILE_NAME.csv')
    countRows = (len(data))

    #Create a dictionary with translated words
    translatedCSV = { "column1":[], "column2":[]} #Change the column names accordingly to your coumns names
 
    #Translated word one by one from the CSV file and save them to the dictionary
    for index, row in data.iterrows():
        translatedCSV["column1"].append(translate(row["column1"]))
        translatedCSV["column2"].append(translate(row["column2"]))

    #Create a Dataframe from Dictionary 
    #Save the DataFrame to a CSV file
    df = pd.DataFrame(data=translatedCSV)
    df.to_csv("translatedCSV.csv", sep='\t')
    

#Call the function
importCSV()


