# JBook Demo App

## Description

Browser based code editor and sandbox demo application.

## Getting Started

### Dependencies

* [Node JS](https://nodejs.org/en)
* [Lerna](https://lerna.js.org)

### Executing program

#### Install dependencies
* Install Node. Using a runtime manager like [asdf](https://asdf-vm.com) or [nodenv](https://github.com/nodenv/nodenv) is highly recommended. This project was built using Node version 14.
* Install Lerna (globally): `npm install -g --save-exact lerna@3.22.1`. Note that this project is using an *old* version of Lerna.
* Install project dependencies: `lerna bootstrap`

#### Launch application
Launch the application by executing `npm run start` (or `lerna run start --parallel`) from the root of the project. This should launch a new browser tab/window. Failing that, navigate to `http://localhost:3000`. 

## Version History

See CHANGELOG.md

## License

This project is licensed under the ISC License - see the LICENSE.md file for details

## Acknowledgments

* [React and Typescript: Build a Portfolio Project](https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project)
* [Stephen Grider](https://github.com/stephengrider)
