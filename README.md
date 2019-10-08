# Node Api for Google Map Marker App
Node api for running CRUD action for Google maps Marker FrontEnd app

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
