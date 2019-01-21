import googleapiclient.discovery
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

credentials = GoogleCredentials.get_application_default()

service = discovery.build('compute', 'v1', credentials=credentials)

PROJECT_ID = '[PROJECT_ID]'

def list_instances(compute, project, zone):
    result = compute.instances().list(project=project, zone=zone).execute() 
    return result['items'] if 'items' in result else None

def checkInstancesInZone(ZONE):
    compute = googleapiclient.discovery.build('compute', 'v1')

    instances = list_instances(compute, PROJECT_ID, ZONE)

    if (instances != None):
        for instance in instances:
            print('Instance name: ' + instance['name'] + "\nInstnace ID: "  + instance['id']  + '\nZone: ' + ZONE)
        
def main():
    request = service.zones().list(project=PROJECT_ID)
    while request is not None:
        response = request.execute()

        for zone in response['items']:
            checkInstancesInZone(zone['description'])

        request = service.zones().list_next(previous_request=request, previous_response=response)

main()
