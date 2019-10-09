# Node Api for Google Map Marker App
Node api for running CRUD action for Google maps Marker FrontEnd app
## Running the Project
Before running the project execute,
`npm run build` to build the project first and then `npm run serve`
to run.

## Package that includes in this:

* Webpack(for creating build version).
* Typescript (for ES6 code).
* Babel (for compiling typescript code).

### Folder structure:
All the files all resided inside src folder.Entry file is 'app.ts' <br>
Folder structure
```
src/
  controller/
    marker.index.ts
  model/
    marker.model.ts
  routes/
    index.ts
  validation/
    schema/
      marker.schema.ts
    index.ts
  app.ts
  config.ts
  dbconfig.ts
```

### File details

#### app.ts:
  Contains the bootstrapper and includes the dependencies.
#### config.ts
  Contains global configs of the app.
  ```
  {
      accessKey:"", // google map active api key
      geocodeApi:"https://maps.googleapis.com/maps/api/geocode/json", // default
      dbString:"mongodb://localhost/test", // database string
      portToConnect:5000 // port to connect for endpoints
  }
  ```
#### dbconfig.ts
  Contains the global dbconfig of the app.
#### Routes:
 All the routes related codes are resides here.
#### Controller:
  All the controller related codes are resides here.
#### Model:
  All the database model related codes are resides here.
#### validation:
  All validation codes are written here with schema declaration also.
 ## Configutation for the project
 * For any kind of changes in configuration just change in the config.ts file and no
     other changes needed.
 * If third party api like google geoecode api here, changes and a new api is introduced,there
 is no need to change internal coding.What needs to be done is follow below.
 There is a schema configuration declared inside the validation/schema/marker.schema.ts file.
 What needs here is, just to change the mapping of the response coming from the third party api
 with given property.Here 'address','longitude' and 'latitude' are the property that are needed to
 save data in marker table.
  ```
 {
     address:"formatted_address", 
     longitude:"geometry.location.lng",
     latitude:"geometry.location.lat"
 }
 ```
Example third party response:
 ```
{
   "address_components" : [
      {
         "long_name" : "1600",
         "short_name" : "1600",
         "types" : [ "street_number" ]
      },
      {
         "long_name" : "Amphitheatre Pkwy",
         "short_name" : "Amphitheatre Pkwy",
         "types" : [ "route" ]
      },
      {
         "long_name" : "Mountain View",
         "short_name" : "Mountain View",
         "types" : [ "locality", "political" ]
      },
      {
         "long_name" : "Santa Clara County",
         "short_name" : "Santa Clara County",
         "types" : [ "administrative_area_level_2", "political" ]
      },
      {
         "long_name" : "California",
         "short_name" : "CA",
         "types" : [ "administrative_area_level_1", "political" ]
      },
      {
         "long_name" : "United States",
         "short_name" : "US",
         "types" : [ "country", "political" ]
      },
      {
         "long_name" : "94043",
         "short_name" : "94043",
         "types" : [ "postal_code" ]
      }
   ],
   "formatted_address" : "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
   "geometry" : {
      "location" : {
         "lat" : 37.4224764,
         "lng" : -122.0842499
      },
      "location_type" : "ROOFTOP",
      "viewport" : {
         "northeast" : {
            "lat" : 37.4238253802915,
            "lng" : -122.0829009197085
         },
         "southwest" : {
            "lat" : 37.4211274197085,
            "lng" : -122.0855988802915
         }
      }
   },
   "place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
   "types" : [ "street_address" ]
}
  ```
  
  ## Endpoints example and details
  
 ### List of Marker
    ```
    {
        endpoint:"http://localhost:5000/allMarker", 
        type: "get",,
        response:{
             "status": true,
             "data": [
                 {
                     "_id": "75fda6c8-566f-48a1-9d98-4a3bddfd7a6a",
                     "address": "Pabna, Bangladesh",
                     "longitude": "89.2590572",
                     "latitude": "24.0128563",
                     "createdAt": "2019-10-08T19:12:49.875Z",
                     "updatedAt": "2019-10-08T19:12:49.875Z",
                 }
             ]
         }
    }
    ```
        
  ### Add New Marker
   ```
   {
       endpoint:"http://localhost:5000/addMarker", 
       type: "post",
       payload: {
        	"address":"H-9, Sunibir Housing, Road No: 3 Adabor, Mohammadpur, Dhaka 1207"
        },
        response:{
         "status": true,
         "message": "saved successfully",
         "itemId": "a367c302-40b5-4c0a-bef6-2458f6e28f8c"
         }
   }
   ```
   
   ### Edit existing Marker
      ```
      {
          endpoint:"http://localhost:5000/updateMarker", 
          type: "post",
          payload: {
             "itemId": "04f937ed-6e69-4b4c-aa1a-41c9e400f87e",
              "address":"kushtia"
           },
           response:{
                "status": true,
                "data": "Updated successflly"
            }
      }
      ```
   ### Delete Marker
      ```
      {
          endpoint:"http://localhost:5000/deleteMarker", 
          type: "post",
          payload: {
             "itemId": "04f937ed-6e69-4b4c-aa1a-41c9e400f87e"
           },
           response:{
                "status": true
            }
      }
      ```