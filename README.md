# Toolcity
The app is setup using an **Express.js server**, running at port (process.env.PORT) 300 by default.  
The express app uses a **create-react-app** (by [the facebook team](https://github.com/facebook/create-react-app)) based app, in order to simplify the process of returning a compiled React.js app, as well as supporting API routes on the same server.

## Setup
### Heroku
- If you do not have **heroku-cli**, go to [this page](https://devcenter.heroku.com/articles/heroku-cli), and follow the instructions to download, and install the appropriate package
- After you install the cli, be sure to run the `heroku login` command, in order to connect to the correct Heroku account
- There are *two ways* to **create an app** on Heroku using your code:
1. *Terminal*
    - On your terminal, go to the project folder and run
        ```
        $ heroku create .
        ```
    - This will create an app with a dynamic name on your heroku cloud, and add that as a remote git repo that you can push code to, and automatically deploy
2. *Heroku dashboard*
    - Go to your [app dashboard](https://dashboard.heroku.com), and create a new app with a name of your choice
    - On the terminal, go to the project folder and run
        ```
        $ heroku git:remote -a <YOUR-APP-NAME>
        ```
    - This will add your app as a remote git repo that you can push code to, and automatically deploy
- This app is ready to be deployed to Heroku. It uses a PostgresSQL DB instead of MySQL, as Heroku natively supports Postgres, and offers it free for hobby-dev, out of the box. As the SQL syntax is largely similar, we can approximate the DB implementation.
- Go to your [app dashboard](https://dashboard.heroku.com), and select the app you're using for deployment. In the overview, there would be a tab named, 'Resources', visit that.
- This tab contains configuration for additional items required by our app (eg database). Under the Add-ons section, type in Postgres, and select the autocompleted option: 'Heroku Postgres'. This requires neither billing set up, nor a credit card. Click 'Provision' on the pop-up, and proceed.
- This will automatically setup an environment variable named `DATABASE_URL` within the app, which can be used to make the DB connection.

### App
This is an npm based build configuration, which uses the `package.json` file to reference the commands, and dependencies to build the app
- To update dependencies
    ```
    $ npm install
    ```
- To build the react app (in case of changes)
    ```
    $ npm build
    ```
- To run the server locally (in development mode)
    ```
    $ npm run dev
    ```
- To run the server locally (in development mode)
    ```
    $ npm start
    ```

## Deployment
Once you follow the instructions for the *heroku setup* above, deploying the app is as simple as pushing to the heroku repository
```
# Assuming you're pushing the branch named 'master'
$ git push heroku master
```

## Flow of control
- `bin/www` is the app's **entry point**. Here all the *server configurations* are set up, and the server is started
- `server.js` contains the **app setup**, and is directly called by `bin/www`. Here the *Express.js app is configured*, and all the URL handlers are setup. This is also where all requests to *non-api* paths are redirected to the `public/index.html` file
- The rest follows the MVC pattern;
- `model/` contains the database setup, and the model corresponding to each DB table
- `view/` contains the main React.js app
    - When `npm build` is run, the react app under `app/` is built, and its ouput is cpoied into the `public/` folder. A react app's main **entry point** is *index.html*, so we need to redirect any *non-api* requests to the index.html file to allow react to handle it
- `controller/` contains the URL handlers
  - `controller/index.js` contains the routing logic for all backend API calls, and calls the corresponding handler under the `controller/` folder
- `services/` contains app services, which act as a middle-man between the controller and the model. They contain the main business logic, and this file structure helps separate request handling (controllers) from data manipulation (services)
