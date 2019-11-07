This project is test project. It is simple Application that fetches pokemons list
## Setup Application
Clone repo from GitHub and run

### `npm install`

This command will install all necessary dependencies to `node_modules` folder 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

After you start the application you will be redirected to `/details`, where list with pokemon's cards will be appeared.
You can click on pokemon's card and you will be redirected to `/details/{:id}` and see modal window with details of selected pokemon. 
If you choose pokemon from the list that already has been downloaded from the server, application will not do additional query as this pokemon info already
has been cached in store, alternatively, you can type `/details/{:id}` manually and app will try to find selected pokemon in the cached list, but
if this is unsuccessful, then app makes the query to get single pokemon's info from the server.<br>
You can set `blockSize`: the number of items that lazy render on the screen and `pageSize`: the quantity of items that are fetched in single server query. 
To do this, please edit `/src/constants.js` file.<br> 

The page will reload if you make edits.<br />
You can switch between All Currencies and Favorites Tabs, add or remove items to Favorites by clicking on Heart Icon.  

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!<br>

#### I hope you enjoy this application