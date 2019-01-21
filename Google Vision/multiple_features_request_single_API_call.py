import io
import os

from google.cloud import vision
from google.cloud.vision import enums
from google.cloud.vision import types

# Instantiates a client
client = vision.ImageAnnotatorClient()

features = [
    types.Feature(type=enums.Feature.Type.LABEL_DETECTION),
    types.Feature(type=enums.Feature.Type.FACE_DETECTION),
]

requests = []

# The name of the image file to annotate
file_name = os.path.join(
    os.path.dirname(__file__),
    '[IMAGE].jpg')

# Loads the image into memory
with io.open(file_name, 'rb') as image_file:
    content = image_file.read()

image = types.Image(content=content)

request = types.AnnotateImageRequest(image=image, features=features)
requests.append(request)

response = client.batch_annotate_images(requests)

for annotation_response in response.responses:
    print(annotation_response)
