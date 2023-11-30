# TV Shows App
This application allows users to look for TV shows based on different genres (drama, comedy, sports, etc.).
TV shows data is served by the following open API: http://www.tvmaze.com/api

## Background
This app is part of a technical assessment. It has been code mostly following TDD approach.

## Prerequisites
- Node Version >= 18.18.2
- Npm Version >= 9.8.1

## Getting Started

### General Info
- This app was created using: `ionic start tvShowsApp`. Choosing Angular Standalone Components and a Blank template

### Starting the application
--

Before starting the application you need to install the recommended versions of Node and NPM. Then you are fine running `npm ci` to install all the npm packages.
After starting the application you can open it ain your browser at [http://http://localhost:8100/](http://http://localhost:8100/).

### Environments

-   development
-   production

### `ionic serve`

Runs the app in the development mode.<br />
This means it will point to a local instance of the activities-service-be on [http://localhost:8080](http://localhost:8080).
This does not apply to the pdf-service-be. You can change this by editing the corresponding `.env` file in the env directory.

Ionic will watch for changes and do hot-reload when necessary.


## Testing the application

At this time, we only have unit tests, but it is planned to have some e2e tests using playwright or cypress.

---

### `ng test`

This command, will launch a ChromeHeadless Browser (default in karma.conf.js) in watch mode. The runner will run all the tests whenever a change in your code happens.

### `ng lint`

We are using eslint with prettier in order to avoid typical issues and to have a common coding-style.
Feel free to configure your IDE prettier/eslint plugins to don't have the need to run this command.

## Building the application

### `ng build`

This command will generate the app production files, ready to be deployed.

## Contributing and Known issues

To contribute to this repository feel free to create a PR.
- There are some tests missing.
- There are plenty of features that we could possibly add.
  - Adding skeleton for the images, virtual-scroll and infinite-scroll has improve performance (les items rendered; blocking time to a minimum). But some bugs appeared:
    - Scrolling on simulated desktop devices (Chrome) stop working (on Desktop works well)
    - On bigger screens (when the swiper creates 2 or mores slides) the number of slides are lost after infinite-scroll triggers several times. 
      - After some research this could be caused by the swiper being destroyed and created again, but we don't want to go down the rabbit hole, it might exist a better solution.

---

### Structure

As we are starting our app and we don't know the future stories/epics, we are grouping our files by separating concerns in a technical way (like services, components). Our pages are generated direct under the `app` folder.
We are trying more and more to achieve a feature based structure in our app.
This means that we will try to have all files needed for a certain feature in one directory. This would include components, mocks, directives, pages, etc.

So if you are contributing to this project please keep in mind, to structure your code feature based.

## Committing

-  We usually have **two reviewers** per merge request, to share knowledge as wide a possible in our team. We encourage pair review sessions too.
-  We plan to have a **pre commit hook** using`husky`, in which lint and unit test the project before every commit.
