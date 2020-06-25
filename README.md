# 'Zaplanuj Jedzonko' - application and landing page
The project includes: (1) an application enabling management of recipes and nutrition schedules for registered users (on the screen below) and (2) a responsive one-page website encouraging the use of the app. It is the individual final project of the Coders Lab course.

![Project screenshot](/src/assets/project_screen.jpg)

# Live demo
somelink

# Features
## Application
* Authorization forms:
  * sign in
  * sign up
  * reset password (via e-mail)
  * show/hide password feature
* Account features:
  * add/remove user avatar
  * sign out
* Navigation drawer (mini and normal variant toggle)
* Alerts:
  * information of recipes number
  * add schedule reminder (if there is none)
  * welcome information
* Add a recipe giving:
  * name
  * description
  * list of instructions
  * list of ingredients
* Add a schedule giving:
  * name
  * description
  * week number
  * nutrition schedule for 5 meals each day of the week (basing on previously submitted recipes)
* Manage your recipes/schedules with:
  * editing (with a feature of confirm/cancel changes)
  * removing
  * duplicating
  * printing (or exporting as PDF)
* List of recipes/schedules as a table with:
  * sorting feature
  * search field
* Nutrition schedules overview on the app's desktop as a table with pagination
* Loading screen (until elements load)
## Landing Page
* Responsive Web Design (RWD) modes:
  * mobile
  * tablet
  * desktop
* Interactive carousel-type gallery
* Subscribing for the newsletter feature
* Smooth scrolling and animations
* Loading screen (until elements load)

# Information
* This is the individual final project of the Coders Lab course: 'JavaScript Developer: React'.
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Front-end was created with React and back-end is handled by Firebase.
* For more details see the 'Technologies' section.

# Technologies
* React, based on:
  * Hooks
  * JSS
  * Context API
  * HOCs
* React Router
* React Material-UI
* React Bootstrap (for landing page carousel only)
* React Scroll
* Firebase
* Print.js
* HTML
* Fonts:
  * OpenSans
  * Charmonman (logo)

# Download and Install
* Use the link from the 'Clone or download' button to download the project.
* In the project directory, type:
```
npm i
```
to install necessary dependencies.
* Run:
```
npm start
```
to start the app in the development mode.
* Open http://localhost:3000 to view it in the browser.