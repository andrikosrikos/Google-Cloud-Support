# Google-Cloud-Support

## Sample Codes provided for SO support:
**Structure:**
```
.
└── Google-Cloud-Support
    ├── Bucket
    │   ├── blobs_python.py
    │   ├── download_and_upload_bucket.js
    │   ├── move_files_bash.sh
    │   └── search_objects_custom_metadata.py
    ├── Cloud Functions
    │   ├── get_filePath_fileName_CloudStorageTrigger_python.py
    │   └── get_gcs_bucket_acls_node.js
    ├── Datastore
    │   └── load_records_node.js
    ├── download_image_upload_to_bucket.js
    ├── Entities-Python
    │   ├── cf_datastore_update_python.py
    │   ├── flaskEntitiesRedirect.py
    │   └── save_json_data_to_datastore.py
    ├── Firestore
    │   └── collections_documents_fields_nodejs.js
    ├── GCE
    │   └── list_instances.py
    ├── Google Translate API
    │   └── translate_csv_python.py
    ├── Google Vision
    │   └── multiple_features_request_single_API_call.py
    └── README.md
```

## Bucket
### blobs_python.py
What it does:

**Runtime:** Python

**Required:**

```
pip install flask
pip install google-cloud-storage
```
**What it does:**
- List blobs
- Delete blobs

