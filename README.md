# Image Search Coding Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To start this project you need to add **.env** file with next properties:
```
REACT_APP_PIXABAY_API_KEY={pixabay api key}
PORT={server port to serve build}
```

## Functionality description
This app contains the search bar placed at the center of the page and once a search query is submitted, the search bar moves to the top of the screen with animations and grid of images is shown beneath. Modal with big image can be shown by click on image. To get images the app uses [PIXABAY API](https://pixabay.com/api/docs/)

## Technology stack
1. FE framework: React
2. Stylesheets: SCSS
3. Unit tests: Jest+Enzyme

## Deployments
The app is deployed to Heroku, you can find working copy [HERE](https://photo-gallery-challenge.herokuapp.com/)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm start`

Serves the builded app in the production mode. (you should run **npm build** before executing this script)\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
