# Toolcity
The app is setup using an **Express.js server**, running at port (process.env.PORT) 300 by default.  
The express app uses a **JSX view engine** (by [the react team](https://github.com/reactjs/express-react-views)), in order to simplify the process of returning a React.js app, as well as supporting API routes on the same server.

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

### App
This is an npm based build configuration, which uses the `package.json` file to reference the commands, and dependencies to build the app
- To update dependencies
    ```
    $ npm install
    ```
- To run the server locally (in development mode)
    ```
    $ npm run dev
    ```

## Deployment
Once you follow the instructions for the *heroku setup* above, deploying the app is as simple as pushing to the heroku repository
```
# Assuming you're pushing the branch named 'master'
$ git push heroku master
```

## Flow of control
- `bin/www` is the app's **entry point**. Here all the *server configurations* are set up, and the server is started
- `server.js` contains the **app setup**, and is directly called by `bin/www`. Here the *Express.js app is configured*, and all the URL handlers are setup
- `routes/` contains the URL handlers
  - `routes/api.js` contains the routing logic for all backend API calls, and calls the corresponding handler under the `api/` folder
  - `routes/index.js` contains the routing for the UI calls, and finds the corresponding React UI under the `app/` folder