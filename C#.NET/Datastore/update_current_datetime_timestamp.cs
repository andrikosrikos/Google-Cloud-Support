using System;
using Google.Cloud.Datastore.V1;

namespace VSC
{
    class Program
    {
        public static String projectId = "[PROJECT_ID]";
        public static String name_space = "[NAMESPACE_NAME]";
        public static String entity_kind = "[KIND]";
        public static String entity_key = "[KEY]";
        public static DatastoreDb _db = DatastoreDb.Create(projectId, name_space);
        public static DateTime currentDateTimeTimestampUTC = DateTime.UtcNow;
        
        //Main function
        static void Main()
        {
            KeyFactory _keyFactory = _db.CreateKeyFactory(entity_kind);
            
            //Use this code to CREATE a new KIND and KEY
            /*Entity task = new Entity()
            {
                Key = _db.CreateKeyFactory(entity_kind).CreateKey(entity_key),
                ["UpdatedDate"] = currentDateTimeTimestampUTC
            };

            //Insert the new Entity to Datastore
            task.Key = _db.Insert(task);*/
            
            //Use this code to update a specific KIND and KEY
            Entity _sampleTask = new Entity()
            {
                Key = _keyFactory.CreateKey(entity_key),
            };
            _sampleTask["UpdatedDate"] = currentDateTimeTimestampUTC;
            _db.Update(_sampleTask);

            Console.WriteLine("Application was executed!");
        }
    }
}
