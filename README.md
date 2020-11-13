
## Node.js Express Passport.js JWT
### CRUD API + Authentication


In the project directory, you can run:
#### `node index.js`

### Router
http://localhost:5000/jokes

* GET / Get all jokes.
* POST / Add new joke. (Need authentication,* Copy token after login 
and fill in 'Headers' Postman,KEY:authorization,VALUE:{Your token} )
* GET /:id Get joke by id.
* DELETE /:id Delete joke.  (Need authentication,Same as Add new joke)
POST /:id/like Like a joke. 
POST /:id/dislike Dislike a joke

* POST /jokes/login Login
* POST /jokes/register Register

