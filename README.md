# GSAP & React Guide Samples
[![Dependency Status](https://img.shields.io/david/rhernandog/gsap-react-guide.svg)](https://david-dm.org/rhernandog/gsap-react-guide)
## Description
This is a collection of samples used in the GSAP & React official guide.

This repo groups all the samples from the official [GreenSock](https://github.com/greensock) guide to animate DOM elements in a React app using [GSAP]() and (in some cases) [React Transition Group]

#### Important Note
The code and bundling on this repository is not meant for production code, just development and learning purposes. If you want to deploy some part of this code into a production app, use a startup of your like, such as Create React App or other, and then include the code in that bundling environment.

## Installing
Just clone the repo:
```
$ git clone https://github.com/rhernandog/gsap-react-guide.git
```
Or just download the ZIP file and extract it in your local machine.

Then install the dependencies:
```
$ npm install
```

## Live Samples and Edit
In order to view the live samples you need to open the `index.js` file in the `src/` folder. In it import the sample you want from the `src/components/` folder and run:
```
$ npm start
```
To update the styles change the files in the `src/styles/` folder. The `base.css` file is the one used as well... base for all the samples. Then each sample might have a specific stylesheet that's imported in the specific `js` file in the `src/components/` folder.

```js
import ComponentName from "./components/path-to-component";

// in the render method
render(){
  return <div>
    <ComponentName />
  </div>;
}
```

#### About the TransitionList Component.
The transition list component, obviously works with a dynamic list of elements that can be increased or reduced by user interaction. This list is passed through the props of the components in the `src/index.js` file and should be imported in that root file from the `helpers/` folder:

```js
import TransitionList from "./components/transition-list";
import { cards } from "./helpers/transition-group-cards";

// then in the render method of the main app
render(){
  return <div>
    <TransitionList cards={cards} />
  </div>;
}
```

## Changelog

#### Version 1.2.2
- Synced article content betweent the article.md file and the article in GreenSock's blog.

#### Version 1.2.1
- Properly formatted FAQ's markdown.

#### Version 1.2.0
- Fixed route in readme file.
- Added acknowledgments in the article and readme files.
- Created FAQ file.
- Added sample to control state using GSAP.

#### Version 1.1.0
- Fixes implicit returns in `ref` callbacks.
- Adds `constructor` method to each sample and passes the `props` to the `super` call.
- Fixes issues in JSX, moving attributes in long lines to an independent line each.
- Changes sample code in the [multiple elements](https://github.com/rhernandog/gsap-react-guide/blob/master/src/components/simple%20tween/multiple-elements.js) sample, in order to remove side effects from the ref callback. Creates an array with the DOM elements and then uses that array in `componentDidMount` to create the timeline.

#### Version 1.0.0
- Stable initial commit.

## Bug Report
Just create an [issue](https://github.com/rhernandog/gsap-forums-react/issues).

## Contributing
Create a PR and test it thoroughly before submitting it. 

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/rhernandog/gsap-react-guide/blob/master/LICENSE.md) file for details.

## Author
- Rodrigo Hernando
- Twitter [@websnapcl](https://twitter.com/websnapcl)
- Codepen [rhernando](https://codepen.io/rhernando/)

## Acknowledgments
First I'd like to thank Jack Doyle (creator of GreenSock) and [Carl Schooff](https://twitter.com/snorklTV) (GreenSock's one and only Geek Ambassador) for trusting me such an important task.

Also I'd like to thank the following developers:

- Xiaoyan Wang (Horizon Blue). A very talented React developer, while Xiaoyan doesn't have a very active *social* life (twitter, facebook, etc), you can follow what He does in [GitHub](https://github.com/horizon-blue).
- Jason Quense. One of the maintainers of React Transition Group and part of React Bootstrap. Also collaborates in many other React-related projects. Check Jason's [GitHub profile](https://github.com/jquense) for more info.
- Last but not least, Matija Marohnić. The most active contributor and maintainer of React Transition Group and Part of the Yeoman Team. Matija also contributes in a lot of React-related projects as well as many other open source software. Be sure to follow Matija in [GitHub](https://github.com/silvenon) and [Twitter](https://twitter.com/silvenon).
