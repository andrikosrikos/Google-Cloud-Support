def checkUploadedFile(event, context):
    file = event
    print(f"File path: {returnFilePath(file['name'])}.")
    print(f"File name: {returnFileName(file['name'])}.")
    
def returnFilePath(string):
    import os
    path, filename = os.path.split(string)
    return path

def returnFileName(string):
    import os
    path, filename = os.path.split(string)
    return filename
