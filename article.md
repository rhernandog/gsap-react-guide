**Before We Start**

This guide assumes a basic knowledge of both GreenSock Animation Platform (GSAP) and React, as well as some of the most common tools used to develop a React app. With that in mind you should have your own React App bundling set up.

## Preface
As GSAP becomes the de-facto tool to create complex and rich animations and UI's in the web, developers have to translate their GSAP knowledge to other tools as well. React has been around for quite a while, it works great as it allows developers to write their apps in a modular, declarative and re-usable fashion. But there is a hurdle developers must go through in order to use GSAP in a React app, getting the DOM element we want to animate and do things **The React Way** in the process.

As we go through this guide we'll focus on the most common scenarios to use GSAP in a React app, starting from the simplest tasks to finish with more complex and real life-like samples of animations.

Finally, we won't delve into how a React app should be structured and/or written, since our focus is to show how to use GSAP in them, but at the same time, we assure you that the techniques used throughout this guide follow the best practices and official guidelines, and have been reviewed by advanced React developers and maintainers of the React Transition Group tool.

## How GSAP Works
The most basic way to explain what GSAP does it's that it takes an object and updates a numeric property in a specific amount of time. When animating a DOM element, GSAP updates the the specific style property of that element in an amount of time.

```js
const myElement = document.getElementById("my-element");
TweenLite.to(myElement, 1, {x: 100, y: 100});
```

As you can see this means that we need access to the actual DOM node, rendered in the document in order to pass it to the `TweenLite` constructor.

## How React Works
Explaining how React works could take several paragraphs and this guide is not about that. Instead we'll focus on how React gets the **JSX** code we write and puts that in the DOM.

```js
<div className="my-class">
  Some content here
</div>
```

The first thing is that we learn and see about React is that normally we don't pass an `id` attribute to the element, because we use a declarative way to access methods, instances, props and state. Is through the component's or the application's state that we can change how things are represented in the DOM, so there's no DOM manipulation. Since there's no DOM manipulation, there's no need to actually access the DOM. The React team thought about this and through the different versions has given developers ways to access the DOM nodes when needed. At the time of the creation of this article (August, 2018) the latest version of React (16.4.2) allows developers to use **Refs** to get the DOM nodes and use them. In this guide we'll use mainly the **[Callback Refs](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)** to create a reference to the DOM node and use it in a GSAP instance.

## Creating Our First Animation


As we mentioned, we'll use the **ref** callback to access the DOM node we want to animate. Also we'll use the **[componentDidMount](https://reactjs.org/docs/react-component.html#componentdidmount)** lifecycle method of the component to create our first animation, because this will guarantee that the node has been added to the DOM tree and it can be passed into a GSAP instance.

```js
class MyComponent extends Component {
  constructor(props){
    super(props);
    // reference to the DOM node
    this.myElement = null;
    // reference to the GSAP instance
    this.myTween = null;
  }
  
  componentDidMount(){
    // use the node ref to create the GSAP instance
    this.myTween = TweenLite.to(this.myElement, 1, {x: 100, y: 100});
  }

  render(){
    return <div ref={div => this.myElement = div}>
    </div>;
  }
}
```
Not that difficult, right? Let's go through the code so we can understand what is happening here.
First when we create an instance of this class, two properties are added to it: `myElement` and `myTween`, but both are equal to null; why is that? Because at this point the node has not been added to the DOM tree and if we create a GSAP instance, we'll get an error indicating that GSAP cannot tween a `null` target. Later these will be updated. After the new instance has been initialized the render method runs, there we're using the `ref` attribute that is basically a function that has as only parameter, the DOM node being added to the DOM tree. At this point we update the reference to the DOM node created in the class constructor, after that, this reference is no longer `null` and can be used anywhere we need it in our component. Finally the `componentDidMount` method runs and updates the reference to `myTween` with a `TweenLite` instance that has as target the internal reference to the DOM node we actually want to animate. Simple, elegant and very React-way of us!!

It is worth mentioning that we could have created a **one-run-animation** by not creating a reference to the GSAP instance in the constructor method. We could have just created a `TweenLite` instance in the `componentDidMount` method and it would run immediately, like this:

```js
componentDidMount(){
  TweenLite.to(this.myElement, 1, {x: 100, y: 100});
}
```

The main benefit of storing a GSAP instance as a reference in the component, is that this pattern allows us to use any of the methods GSAP has to offer like: play, pause, reverse, restart, seek, change the speed (timeScale), etc., to get full control of the animations. Also this approach allows us to create any GSAP instance (Tween, Timeline, Draggable, etc) in the constructor. For example we could use a timeline in order to create a complex animation:

```js
constructor(props){
  super(props);
  this.myElement = null;
  this.myTween = TimelineLite({paused: true});
}

componentDidMount(){
  this.myTween
    .to(this.myElement, 0.5, {x: 100})
    .to(this.myElement, 0.5, {y: 100, rotation: 180})
    .play();
}
```

As you can see with this approach we create a paused Timeline in the constructor and add the instances using the shorthand methods. Finally since the Timeline was paused upon initialization, we play it after adding all the instances to it. We could also leave it paused and control it somewhere else in our app. The following example shows this technique:

#### [SIMPLE TWEEN SAMPLE](https://stackblitz.com/edit/gsap-react-simple-tween)

## Animating a Group of Elements
One of the perks of using React is that allows us to add a group of elements using the `array.map()` method, which reduces the amount of HTML we have to write. This also can help us creating an animation for all those elements. Let's say that you want to stagger how a group of elements is animated in the screen, well using basically the same approach we can achieve that.

```js
constructor(props){
  super(props);
  this.myTween = new TimelineLite({paused: true});
  this.myElements = [];
}

componentDidMount(){
  this.myTween.staggerTo(this.myElements, 0.5, {y: 0, autoAlpha: 1}, 0.1);
}

render(){
  return <div>
    <ul>
      {elementsArray.map((element) => <li
        key={element.id}
        ref={li => this.myElements.push(li)}
      >
        {element.name}
      </li>)}
    </ul>
  </div>;
}
```
Now this looks a bit more complex but the principle remains. Basically we're using the same pattern to access each DOM node, the only difference is that instead of using a single reference for each element, we add each element to an array. Finally in the `componentDidMount` method we add a `staggerTo` instance and GSAP does it's magic to create a staggered animation. [Here](https://greensock.com/docs/TimelineLite/staggerTo()) you can know more about the `staggerTo` method.

#### [MULTIPLE ELEMENTS SAMPLE](https://stackblitz.com/edit/gsap-react-multiple-elements)

## Creating a Complex Sequence

But we won't always get all the elements in an array, sometimes we might need to create a complex animation using different elements. Just like in the first example we store a reference in the constructor for each element and create our timeline in the `componentDidMount` method:

#### [TIMELINE SEQUENCE SAMPLE](https://stackblitz.com/edit/gsap-react-timeline-sequence)

Note how in this sample we use a combination of methods. Most of the elements are stored as a an instance property using `this.element = null`, but also we're adding a group of elements using an `array.map()`. But instead of using the `map()` callback to create instances in the timeline (which is completely possible. Even further we could create a separate Timeline and then add it to the main timeline), we're adding them to an array that is passed in the `staggerFrom` shorthand method to create the stagger effect.

## Animating Via State

The most common used pattern to update a React app is through changing the state of it's components. So it should be expected that developers could control when and how elements are animated based on the app state. Is not very difficult to *listen* to state changes and control a GSAP instance depending on that, using the **[componentDidUpdate](https://reactjs.org/docs/react-component.html#componentdidupdate)** lifecycle method. Basically we compare the value of a state property before the update and after the update, and control the GSAP instance according to that

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.play !== this.state.play) {
    this.myTween.play();
  }
}
```

#### [CONTROL THROUGH STATE SAMPLE](https://stackblitz.com/edit/gsap-react-state-control)

In the example we compare the value of different state properties (one for each control method implemented in the component) to control the GSAP instance, as those values are updated. Is important to notice that this sample is a bit convoluted to do something that can be achieved by calling a method directly on a event handler (such as `onClick`) the main idea is to show the proper way of controlling through the state.

A cleaner and simpler way to control a GSAP instance is passing a prop from a parent component or through an app state store such as Redux or MobX. This modal samples does exactly that:

```js
// parent component
<ModalComponent
  visible={this.state.modalVisible}
  close={this.setModalVisible.bind(null, false)}
/>

// ModalComponent
constructor(props){
  super(props);
  this.modalTween = new TimelineLite({ paused: true });
}
componentDidMount() {
  this.modalTween
    .set(this.modalWrap, { autoAlpha: 1 })
    .to(this.modalDialog, 0.25, { y: 50 }, 0)
    .reversed(true)
    .paused(false);
}
componentDidUpdate(){
  this.modalTween.reversed(!this.props.visible);
}
```

As you can see the modal animation is controlled by updating the `visible` prop passed by it's parent, as well as a *close* method passed as a prop as well. This code is far simpler and reduces the error possibility.

#### [STATE MODAL SAMPLE](https://stackblitz.com/edit/gsap-react-state-modal)

## Using React Transition Group
[React Transition Group](https://reactcommunity.org/react-transition-group/)(RTG) is a great tool that allows another level of control when animating an element in a React app. This is referred to the capcity to mount and unmount either the element being animated or an entire component, if we want to. This might not seem like much when animating a single image or a div, but this could mean a significant performance enhancement on our app in some cases.

#### [SIMPLE TRANSITION GROUP SAMPLE](https://stackblitz.com/edit/gsap-react-simple-transition-group)

In this example the `<Transition>` component wraps the element we want to animate. This element remains unmounted while it's `show` prop is false. When the value changes to true, is mounted and then the animation starts. Then when the prop is set to false again, another animation starts and when is completed is unmounted using the `done` callback in the `onComplete` event callback provided by GSAP. We can also use the `<Transition>` component to wrap the entire component.

RTG also provides the `<TransitionGroup>` component, which allows to control a group of `<Transition>` components, in the same way a single `<Transition>` component allows to control the mounting and unmounting of a component. This is a good alternative for animating dynamic lists that could have elements added and/or removed, or lists based on data filtering.

#### [TRANSITION GROUP SAMPLE](https://stackblitz.com/edit/gsap-react-transition-group-list)

```js
<Transition
  timeout={1000}
  mountOnEnter
  unmountOnExit
  in={show}
  addEndListener={(node, done) => {
    TweenLite.to(node, 0.35, {
      y: 0,
      autoAlpha: show ? 1 : 0,
      onComplete: done,
      delay: !show ? 0 : card.init ? props.index * 0.15 : 0
    });
  }}
>
```

In this samples we use the **[addEndListener](https://reactcommunity.org/react-transition-group/transition#Transition-prop-addEndListener)** callback from the `<Transition>` component. This gives us two parameters, the `node` element being added in the DOM tree and the `done` callback, which allows to control the inner state of the `<Transition>` component as the element is mounted and unmounted. The entire animation is controlled by the `in` prop, which triggers the `addEndListener` and ultimately the animation. You may notice that we're not creating two different animations for the enter/exit state of the component. We create a single animation that uses the same DOM node and the same properties, by doing this, GSAP's overwrite manager kills any existing animation affecting the same element and properties and creates the new one, giving us a seamless transition between the enter and exit animations. Finally, using RTG allows us for a more fine grained code, because we can use all the event callbacks provided by GSAP (onStart, onUpdate, onComplete, OnReverse, onReverseComplete) to run all the code we want, before calling the `done` callback (is extremely important to notify that the animation has completed).

## Animating Route Changes
Routing is one of the most common scenarios in a React app. Route changes in a React app means that an entirely different view is rendered depending on the path in the browser's address bar, being the most common pattern to render a completely different component in a route change. Obviously animating those changes gives a very professional look and feeling to our React apps. Rendering a new component based on a route change means that the component of the previous route is unmounted and the one for the next route is mounted. We already covered animating components animations tied to mount/unmount using the `<Transition>` component from RTG, so this is a very good option to animate route changes.

```js
<BrowserRouter>
  <div>
    <Route path="/" exact>
      { ({ match }) =>  <Home show={match !== null} /> }
    </Route>
    <Route path="/services">
      { ({ match }) => <Services show={match !== null} /> }
    </Route>
    <Route path="/contact">
      { ({ match }) => <Contact show={match !== null} /> }
    </Route>
  </div>
</BrowserRouter>
```
This main component uses React Router's `<BrowserRouter>` and `<Route>` and checks the `match` object passed as a prop to every `<Route>` component, while returning the component that should be rendered for each URL. Also we pass the show property to each component, in the same way we did in the **transition** sample.

```js
<Transition
  unmountOnExit
  in={props.show}
  timeout={1000}
  onEnter={node => TweenLite.set(node, startState)}
  addEndListener={ (node, done) => {
    TweenLite.to(node, 0.5, {
      autoAlpha: props.show ? 1 : 0,
      y: props.show ? 0 : 50,
      onComplete: done
    });
  }}
>
```

As you can see the code is basically the same used to animate a single component, the only difference is that now we have two animations happening in different components at the same time.
#### [REACT ROUTER ANIMATION SAMPLE](https://stackblitz.com/edit/gsap-react-route-animation)
Is worth noticing that the animations used in this sample are quite simple and you can use any type of animation you want and even use timelines to create more complex animations, the sky is the limit in that matter.

As you can see by now, using GSAP in a React app is quite simple and it shouldn't stop you from trying and experimenting with GSAP driven animations in React and using all the tools and plugins GSAP has to offer to create a compelling and amazing React application!!

## FAQ
1. What is this "*Virtual DOM*" thing, that is referred so much when it comes to React Apps?. Can GSAP work with this virtual dom?.
A. The **Virtual DOM** is a way that React has to update the DOM in a fast and efficient way, in order to learn more about it check [this article](https://medium.freecodecamp.org/a-quick-guide-to-learn-react-and-how-its-virtual-dom-works-c869d788cd44) and the [React Docs](https://reactjs.org/docs/faq-internals.html). GSAP can't work with the virtual DOM because the elements in the Virtual DOM are not exactly DOM nodes per-se.
2. I often read about the *declarative nature of React*. Does that affect how we use GSAP in a React APP?.
A. Yes. React works by updating the rendered DOM through changes in the App state, so when creating an animation using GSAP, instead of reaching out directly to the DOM, like in most other cases, we need to wait for those changes in the app state and the DOM to be rendered, in order to use the current representation of the app state and create the animation. To learn more about how declarative and imperative code work read [this article](https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2).
3. In the second sample I see this code in the ref callback `ref={div => this.cards[i] = div}`. Why is the index being used instead of just pushing the element in the array?.
A. The reason for that is quite simple. Everytime a React component is re-rendered, the `render` method is executed, but the original instance remains unchanged. The array used to create the animation is created in the component's constructor. The GSAP instance (a TimelineLite) is created in the `componentDidMount` hook. These two elements are created just once in the App's lifecycle, while the render method is executed on every re-render. Therefore if we push the elements to the array on every re-render, even though the Timeline instance won't change, the array will get bigger and bigger every time the component is re-rendered, whic could cause a memory issue, especially for large collections.
4. In the guide one of the samples triggers animations via the state of a component or the app. Is it possible to update the state of the component/app using GSAP.
A. Of course!! and is really easy too, all you have to do is use one of the many callback events GSAP has to offer. The only precaution is to be aware of infinite loops. That is if an animation is started on the render method of a component and a callback from that animation updates the state of the component. That will trigger a re-render, which will start the animation again. You can check this [simple example](https://stackblitz.com/edit/gsap-update-state) of how that can be done.
5. Is it possible to trigger a route change using GSAP?.
A. It is possible using React Router's API. Although is not very recommendable because using React Router's API direclty will prevent triggering the route change animations when using the browser's *back* and *forward* buttons, while using React Transition Group with GSAP does trigger the route change animations with the native navigation methods.
6. Can I use other GSAP plugins and tools in a React App?. This guide shows only TweenMax, Timeline and the CSS Plugin.
A. Of course, any GSAP tool or Plugin you want can be used in a React app, just be sure to follow the same patterns and guidelines from this article and you'll be fine.
7. I tried the code in the guide and samples, but it doesn't work.
A. Head to the GreenSock Forums, where all your questions will be answered as fast as possible and the comunity will help you.
8. Contributing and Issues in this guide. Can I post something in the GreenSock Forums?.
A. Even though this guide was reviewed by GSAP and React experts, perhaps something might have slipped away, or with time and new software versions, some things should or could be done differently. The GreenSock Forums are not the best place for that, since they purpose is to answer GSAP-related questions. For those cases please head to this [GitHub Repo](https://github.com/rhernandog/gsap-react-guide) and inform any issues or create a Pull Request with the changes you think should be added.

## Acknowledgments
First of all I'd like to thank Jack Doyle and Carl Schooff, for trusting me with such an important task as this article.

Second I'd like to also thank this three developers that took time from their works and lifes to review this guide as well as the samples in it, make sure to follow them:

- Xiaoyan Wang, aka Horizon Blue. A very talented React developer, while Xiaoyan doesn't have a very active *social* life (twitter, facebook, etc), you can follow what He does in [GitHub](https://github.com/horizon-blue).
- Jason Quense. One of the maintainers of React Transition Group and part of React Bootstrap. Also collaborates in many other React-related projects. Check Jason's [GitHub profile](https://github.com/jquense) for more info.
- Last but not least, Matija Marohnić. The most active contributor and maintainer of React Transition Group and Part of the Yeoman Team. Matija also contributes in a lot of React-related projects as well as many other open source software. Be sure to follow Matija in [GitHub](https://github.com/silvenon) and [Twitter](https://twitter.com/silvenon).
