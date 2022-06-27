Angular Testbed

## Notes on the backend:
The backend is based on [JSON-server](https://github.com/typicode/json-server)
Angular-specific tutorial: [here](https://blog.angulartraining.com/fake-your-angular-backend-until-you-make-it-8d145f713e14)
Steps to add the backend:
  0) Set up a .json file somewhere on the disk to hold the database eg ../backend/test_json.db
    a) Populate it with dummy data. Resources on the API have the form:
      each resource API can then be hit via: 
        .../myapi/resource_1 and .../myapi/resource_2
    b) ..and specific ids can be reached at resource_1/2 etc

  1) Add any new routes required in a routes.json file (see notes below)
  2) Add a new line to the scripts list in package.json:
          "backend": "json-server api/db.json --routes api/routes.json --no-cors=true"

          i.e. targetting a specific db.json and a specific routes file
          --no-cors=true is optional for the cross origin stuff
  3) The server should now be launchable via `npm run backend`
  4) Due to CORS blocking in Angular it is necessary to add a proxy to allow calls from the Angular application to the JSON API hosted on another port (despite both services being on localhost, the different ports are also blocked). The topmost tutorial has the solution to this.

    {
    "resource_1": [
        {
          "id": 1,
          "name": "Tapas",
          "country": "Spain"
        },
        {
          "id": 2,
          "name": "Pizza",
          "country": "Italy"
        }
      ],
    "another_resource": [
      {
        "id": 1,
        "shape": "triangle",
        "sides": 3
      },
      {
        "id": 2,
        "shape": "septagon",
        "sides": 7
      }
    ]
  }



  Note:
  a) By default, the API is able return specific elements of the database based on their ids
    eg .../api/x  will return object x from the API
  b) /api/ will return the whole array of objects
  
  Routes:
    Using a routes.json file and launching the backend with that referenced in the arguments it is possible to allow the database to execute rudimentary queries and perform simple tasks such as pagination

  Requests:
    Requests of all types should be supported: GET, POST, PATCH, DELETE

Some other useful JSON backend tools:
  [JSON PlaceHolder](https://jsonplaceholder.typicode.com/)
    Web-based JSON placeholder

  [Casual](https://github.com/boo1ean/casual)
  JS Library for generating dummy JSON data eg `casual.address1`

  [Chance JS](https://chancejs.com/)
  Another JS Library for random dummy JSON data: eg `chance.currency_pair`
  Seems to have better generators relating to finance

  [JSON Generator](https://json-generator.com/)
  A web-based JSON generator tool with JS syntax for the generators


# D3demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
