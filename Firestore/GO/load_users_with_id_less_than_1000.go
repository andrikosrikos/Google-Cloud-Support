/*
Working for Firestore database:
collection: users
>> document: "auto_id"
   --customer_id: 111
>> document: "auto_id"
   --customer_id: 123
>> document: "auto_id"
   --customer_id: 4500
>> document: "auto_id"
   --customer_id: 3500

where 'customer_id' is defined as number type
*/

package main

import (
	"context"
	"fmt"
  "log"
    
  "google.golang.org/api/iterator"

	"cloud.google.com/go/firestore"
)


func main() {
    fmt.Println("Started Firestore app")

    // Sets your Google Cloud Platform project ID.
    projectID := "[PROJECT_ID]"

    // Get a Firestore client.
    ctx := context.Background()
    client, err := firestore.NewClient(ctx, projectID)
    if err != nil {
            log.Fatalf("Failed to create client: %v", err)
    }

    iter := client.Collection("users").Where("customer_id", "<", 1000).Documents(ctx)
    for {
            doc, err := iter.Next()
            if err == iterator.Done {
                    break
            }
            if err != nil {
                    log.Fatalf("Failed to iterate: %v", err)
            }
            fmt.Println(doc.Data())
    }


    // Close client when done.
    defer client.Close()

}
