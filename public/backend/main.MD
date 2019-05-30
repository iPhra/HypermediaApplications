# Documentation of the Backend part
> Deliverable D1
## General group information
| Member n. | Role          | First name | Last Name | Matricola | Email address   |
| --------- | ------------- | ---------- | --------- | --------- | --------------- |
| 1 | Team leader | Luca | Molteni | 10489796 | luca7.molteni@mail.polimi.it |
| 2 | Member | Federico | Piccinini | 10542302 | federico1.piccinini@mail.polimi.it |
| 3 | Member | Francesco | Lorenzo | 10521186 | francesco.lorenzo@mail.polimi.it |


 - Deliverable D0: the web application is accessible at [this address](https://polimi-hyp-2019-team-10489796.herokuapp.com).
 - Deliverable D2: the YAML or JSON file containing the specification of the app
  API can be found at [this address](https://example.com/backend/spec.yaml).
 - Deliverable D3: the SwaggerUI page of the same API is available at
  [this address](https://example.com/backend/swaggerui).
 - Deliverable D4: the source code of D0 is available as a zip file at
  [this address](https://example.com/backend/app.zip).
 - Deliverable D5: the address of the online source control repository is
  available [this address](https://github.com/Molteh/LorenzoMolteniPiccinini). We hereby declare that this
  is a private repository and, upon request, we will give access to the
  instructors.



## Specification

### Web Architecture

![Three tier architecture](webarc_diagram.png)

The web architecture implemented is a three tier one, in which data, the business logic of the application and the presentation
represent different actors which interact between them as shown in the previous picture.

Furthermore, the Data tier represents the DBMS and the storage part, in our case a PostgreSQL database server.
The application layer interacts both with the database and the presentation layer; in the first case it retrieve data from
the database, while in the latter it responds to the API requests received from clients.
Finally, the presentation layer renders the HTML page, both the static and the dynamic part, and presents it to the user.
Notice that, it is ensured that the HTML is rendered client side (presentation tier) since the HTML pages are rendered using
a well designed API schema.

### API

#### REST compliance
Following the main architectural constraints of REST:

- Uniform Interface  
It's ensured through the definition of clear APIs that follow the OpenAPI specifications. All resources are accessible through HTTP requests at precise endpoints, and use JSON as a format to exchange data when needed.  
We did not completely follow REST guidelines concerning what PUT/POST/DELETE should have as return value, as we found them overly complex and meaningless for our case, so most of the times those requests return an empty 200 OK message instead of the resource they interacted with. Obviously, complying with the guidelines would require just small changes to the code.

- Client-server paradigm  
The paradigm is ensured as the client only interacts with the server through its public endpoints, and both could be deployed on different machines without issues.

- Stateless  
The server does not store any information, so parallel instances of the server could be shut down, booted or restarted without disrupting the service (assuming one is always running and instances are stopped when idle).
In our case we have only one instance of the server, and no session information is stored as authentication is dealt with using JSON web tokens.  
No files are saved server-side.

- Caching  
It's not been dealt with server side as we didn't find it meaningful, so if caching happens it's done by the browser.

#### OpenAPI Resource models
- Book: contains the fact sheet of the book, its genres, themes and a path to the image of its cover.
- Author: contains the biographical information of the author, and a path to an image of him.
- Event: contains information regarding the date and place of the event, the organiser, the book it's related to and a path to an image of the location.
- Review: contains the name of the reviewer, the text of the review and the rating given.
- Cart: contains all the books in the cart and its total price.
- User: contains the email, password, id, name and surname of the user.
- Genre: enumeration of all possible genres.
- Theme: enumeration of all possible themes.


### Data model
How these map to the OpenAPI data model?

![ER Diagram](Hypermedia-ERD.png)

For what concerns the table top10, representing the Bestsellers of the month, we decided to fill it manually with 10 arbitrary chosen books.
In a real implementation of the system we would fill the table with a trigger that activates every day and updates the 10 most sold books of the month thus far. 


## Implementation
### Tools used

#####Environment
- Node.js:  
Node.js is an open-source run-time environment to execute JavaScript code outside of a browser, allowing to run server-side scripts.

#####Tools
- Webstorm:  
Webstorm is a JavaScript IDE by JetBrains that offers complete support for the whole javascript ecosystem. It supports both backend (Node.js) and frontend development. It is able to provide intelligent code completion, on-the-fly error detection, powerful navigation and refactoring for JavaScript, stylesheet languages, and all the most popular frameworks.
- PgAdmin:  
PgAdmin is a free application that provide a GUI to easily manage a PostgreSQL database. PgAdmin allows to easily build a database from scratch, create tables and execute optimization operations. It also provide functionalities for database population, query and backup of data.  Through the GUI is possible to  graphically modify tables, create constraints, add enumerations and so on.
- SwaggerHub:  
SwaggerHub is an integrated API development platform that brings together all the core capabilities of the open source Swagger framework, along with additional advanced capabilities to build, document, manage the APIs. We used SwaggerHub in order to write and define our RESTful APIs in a shared environment as a team.
- Swagger editor:  
Swagger Editor is an open source editor to design, define and document RESTful APIs using the Swagger Specification. Given a valid OpenAPI specification it is capable to automatically generate a server stub, providing a solid base upon which starting to implement the endpoint functionalities. Since we edited our API in a shared environment using SwaggerHub we used Swagger editor for the sole purpose of generating the server code.

#####Languages
- Javascript
 
#####Frameworks and Libraries:
- Knex.js:  
Knex.js is a Node.js library that features SQL query and schema builders for the most popular DBMS available. Here it's used to connect to the database, create the schema (in case it's not present already) and query it.
- Jsonwebtoken:  
Jsonwebtoken is the JavaScript implementation of JSON Web Tokens, used here to deal with user authentication (login).     
The private key to decode the token is stored in a config file using the Config library.
- bcrypt.js:  
Bcrypt.js is a Node.js library used here to encrypt and decrypt passwords before storing them in the database, in order to ensure better privacy for the users.
- Config:  
Config is a library used to configure Node.js applications for development, testing and production. Here it is used only for production, storing jwt keys and database configurations.
- Lodash:  
Lodash is a popular JavaScript library for utilities. Here it is used for quick object manipulation.
- Serve-static:  
Serve-static is a Node.js library used here to serve static content over HTTP.


### Discussion
We made sure that our web application adheres to the provided OpenAPI specification by sticking to the structure generated by SwaggerEditor from the specification itself. 
We did not modify what the controllers require as input, and we made sure that the return value conforms to the requirements, as it's proved by testing the APIs.  
Nonetheless, we decided to get rid of promises and use async-awaits for both the services and controllers, as they are much cleaner and intuitive.

The web application is partitioned in three layers: Presentation, Business Logic and Data.  
The presentation layer is completely implemented by the frontend of the website, that has static HTML pages and when needed querys the APIs to retrieve dynamic content. All static assets are located in the frontend.  
The business logic layer is implemented by the backend, that is completely stateless since it's REST compliant.  
Finally, the data layer is implemented by the database, that is separated by the server even physically.

As mentioned in the Tools section, we dealt with sessions by using JSON Web Tokens. This means that the client is provided with a jwt encrypting its user id when he logs in, and it must set the Authorization HTTP header with the key every time it makes a request as a logged user.  
The server receives the key and tries to decrypt it using the private key stored in configuration files. If decryption is successful, the server retrieves the user id stored in the jwt and proceeds with the request, otherwise it returns a HTTP 401 Unauthorized error.  
The jwt doesn't have an expiration date as we decided not to implement the logic to handle expired tokens in the fronted, and the relative endpoint in the backend. Still, the check would be a very simple ping to the endpoint to see if the token is valid, otherwise showing the user as not logged in.  

For what concerns the database, we decided to opt for a relational data model, as the data we are dealing with has an intrinsic structure that can be easily modeled with tables.
  
  

## Other information

### Task assignment
All members took part in defining the overall structure of the website, its design according to the IDM models and the APIs offered by the web server.

Francesco Lorenzo
 - Design: formalised the IDM models using Draw.io.
 - Backend: contributed to the development of the assigned APIs and maintained the backend during the whole development.
 - Frontend: dealt mainly with JQuery scripting to enable dynamic HTML content.

Luca Molteni
 - Design: set up and updated the database tables and formalized the corresponding E-R diagram. Contributed to the design of the APIs needed to serve the website contents.
 - Backend: contributed to the development of the assigned APIs.
 - Frontend: designed homepage, bestsellers, favourites and contact-us pages. Designed navigation bar and implemented search functionality on front-end side. Responsible for website responsiveness.

Federico Piccinini
- Design: contributed to the design of APIs and consistency check between pages' contents and IDM diagrams.
- Backend: definition, implemetation and testing of the assigned APIs
- Frontend: design and implementation of several pages(books_by_X, event, author, cart, book, ordering_and_shipping) and shared elements like footers.


### Analysis of existing API
The first and basic example used to understand how the OpenAPI specification works can be found here https://www.kennethlange.com/write-beautiful-rest-documentation-with-swagger/.
It briefly describes how the document should be structured, and then goes in detail explaining the meaning of the fields for each part: the general information, the REST services and the resources defined.
The running example used is a simple Movie.

The second and more in-depth example is the one proposed by default by Swagger Editor, and is the complete version of the pet store: https://editor.swagger.io.
This example was used to understand mainly which HTTP requests are usually offered for the same endpoint, and how they should be defined in order to be REST compliant.  
Our OpenAPI specification tries to include as many verbs as possible, but lacks some endpoints that should be used by admins and were deemed unnecessary.

Finally, for all syntactic issues we referred to the official specification itself:  https://swagger.io/specification/.

### Learning outcome 
Being the first experience with both frontend and backend development at once, all members learned how to put into use all the good practices of software engineering, especially for what concerns integration, readability and usability. 
Moreover, having to coordinate the frontend with the backend and to coordinate the interaction between us, we acquired experience in defining and providing clear requirements of what a component has to offer, in order to avoid integration mistakes.

Francesco Lorenzo learnt to build a web application using Swagger, which adds to his previous experience with Express.
He had the opportunity to go in-depth with JQuery and AJAX for frontend scripting. Finally, despite not working heavily on the static and styling part of the website, he now knows how CSS and HTML work, and how to create dynamic content for the latter, which was his main goal in the first place. 

Luca Molteni learnt to properly design and formalize using Swagger/OpenAPI notation a RESTful API. Had the opportunity to delve deeper into backend programming using Node.js runtime environment and improved his ability to exploit javascript asynchronous capability using promises. He experienced for the first time the task of web application developing without the support of a framework (e.g. Vue.js). Largely improved his knowledge about HTML and CSS and in particular faced the problems of content responsiveness with the support of Bootstrap 4. 

Federico Piccinini learnt how to use Node.js technology in order to build a full stack web application. Furthermore, he learnt to formally define and implement a suite of RESTful APIs usign Swagger2. From the frontend perspective, he learnt how to design and implement good looking and responsive web pages, using Boostrap 4 tools. Finally, despite not working heavily on the dynamic part of the website, he learnt how to use JQuery and AJAX for several purposes, like making HTTP requests and implementing dynamic page behaviour.
