# Documentation of the Backend part
> Deliverable D1
## General group information
| Member n. | Role          | First name | Last Name | Matricola | Email address   |
| --------- | ------------- | ---------- | --------- | --------- | --------------- |
| 1 | ??? | Luca | Molteni | 10489796 | Luca7.molteni@mail.polimi.it |
| 2 | ??? | Federico | Piccinini | ??? | Federico.piccinini@mail.polimi.it |
| 3 | ??? | Francesco | Lorenzo | ??? | Francesco.lorenzo@mail.polimi.it |


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
Describe here, with a diagram, the components of your web application and how
they interact. Highlight which parts belong to the application layer, data layer
or presentation layer. How did you ensure that HTML is not rendered server side?
### API
#### REST compliance
Describe here to what extent did you follow REST principles and what are the
reasons for which you might have decided to diverge. Note, you must not describe
the whole API here, just the design decisions.
#### OpenAPI Resource models
Describe here synthetically, which models you have introduced for resources.
### Data model
Describe with an ER diagram the model used in the data layer of your web
application. How these map to the OpenAPI data model?
## Implementation
### Tools used
Describe here which tools, languages and frameworks did you use for the backend
of the application.
 <ul>  
<li>Tools</li>  
<ul>  
<li>Webstorm</li>
Webstorm is a Javascript IDE by JetBrains that offers complete support for the whole javascript ecosystem. It supports both backend (Node.js) and frontend development. It is able to provide intelligent code completion, on-the-fly error detection, powerful navigation and refactoring for JavaScript, stylesheet languages, and all the most popular frameworks.
<li>PgAdmin 4</li>  
PgAdmin is a free application that provide a GUI to easily manage a PostgreSQL database. PgAdmin allows to easily build a database from scratch, create tables and execute optimization operations. It also provide functionalities for database population, query and backup of data.  Through the GUI is possible to  graphically modify tables, create constraints, adding enumerations and so on. It is also available  in Heroku that is the free hosting platform selected for this project.
<li>SwaggerHub</li> 
SwaggerHub is an integrated API development platform that brings together all the core capabilities of the open source Swagger framework, along with additional advanced capabilities to build, document, manage the APIs. We used SwaggerHub in order to write and define our RESTful APIs in a shared environment as a team.
<li>Swagger editor</li> 
Swagger Editor is an open source editor to design, define and document RESTful APIs using the Swagger Specification. Given a valid OpenAPI specification it is capable to automatically generate a server stub, providing a solid base upon which starting to implement the endpoint functionalities. Since we edited our API in a shared environment using SwaggerHub we used Swagger editor for the sole purpose of generating the server code.
</ul>  
<li>Languages</li>  
<ul>  
<li>Javascript</li>   
</ul> 
<li>Frameworks  and Libraries
<ul>  
<li>Knex.js</li>   
<li>jsonwebtoken</li>
<li>bcrypt.js</li>
<li>Config</li>
<li>Connect</li>
</ul>  

</ul>

### Discussion
Describe here:
- How did you make sure your web application adheres to the provided OpenAPI
  specification?
- Why do you think your web application adheres to common practices to partition
  the web application (static assets vs. application data)
- Describe synthetically why and how did you manage session state, what are the
  state change triggering actions (e.g., POST to login etc..).
- Which technology did you use (relational or a no-SQL database) for managing
  the data model?
## Other information
### Task assignment
Describe here how development tasks have been subdivided among members of the
group, e.g.:
- Foo worked on front end (80%) and OpenAPI Spec (20% of the time)
- Bar worked on ....
### Analysis of existing API


Describe here if you have found relevant APIs that have inspired the OpenAPI
specification and why (at least two).
### Learning outcome
What was the most important thing all the members have learned while developing
this part of the project, what questions remained unanswered, how you will use
what you've learned in your everyday life?
Examples:
- Foo learned to write SQL queries and Javascript but wanted to know more about
  caching, he's probably going to create his own startup with what she has
  learned
- Bar learned how to deploy on a cloud platform, he would have liked to know
  more about promises for asynchronous code..
