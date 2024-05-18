# Full Stack - Project "Tasks manager"

Full stack project to manage tasks

## Project components

### REST API - Starting

The REST API is responsible for handling the complexity of accessing database securely, persisting data on there, perform the queries to feed the visual apps and guarantee the business rules for this project are being strictly attended.

Also let's say this bad guy here executes remotely on a server somewhere.

**Keywords**: Business Rules, NodeJs, ExpressJs, REST, Database, SQL, ORM, Environment Variables

### Web App - Loading

The Web application is responsible to provide a friendly interface where the user can interact with the system without the need of using raw HTTP client like insomnia or Postman. This layer is also responsible for a "light validation" of inputted data, to avoid failing only on server when possible.

This app must use the API based on user actions, like, let's say, your planning moment before calling the waiter?

**Keywords**: ReactJs, Vite, Yup, Axios

### Mobile App - Done

The Mobile application has, in most cases, the very same responsibilities the Web App does. The main difference is that the mobile approach has some characteristics that makes the experience cleaner in some cases. Not too much text, cleaner screens and maybe some of content available for offline access.

Of 'course We can count on mobile features not so common on a desktop experience, stuff like notifications or other apps integrations, like WhatsApp.

**Keywords**: ReactNative, Expo
