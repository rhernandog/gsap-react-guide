## Preface
This guide assumes a basic knowledge of both the **[GreenSock Animation Platform](https://greensock.com/get-started-js/)** (GSAP) and **[React](https://reactjs.org/)**, as well as some common tools used to develop a React app.

As **[GSAP](https://greensock.com/gsap)** becomes the de-facto standard for creating rich animations and UI's on the web, developers must learn how to integrate it with other tools like React which has become popular because it allows developers to write their apps in a modular, declarative and re-usable fashion. As a moderator in the **[GreenSock forums](https://greensock.com/forums/)**, I've noticed that there are a few common hurdles to getting the two working together seamlessly, like referencing the DOM element appropriately, doing things **The React Way**, etc. which is why I'm writing this article.

We won't delve into how a React app should be structured since our focus is on using GSAP, but the techniques used throughout this guide follow the official guidelines and have been reviewed by maintainers of the React Transition Group tool. We'll start simple and get more complex toward the end.

## How GSAP Works
GSAP basically updates numeric properties of an object many times per second which creates the illusion of animation. For DOM elements, GSAP updates the the inline style properties.

```js
const myElement = document.getElementById("my-element");
TweenLite.to(myElement, 1, {width: 100, backgroundColor: "red"});
```

As you can see this means that we need access to the actual DOM node rendered in the document in order to pass it to the `TweenLite.to()` method.

## How React Works
Explaining how React works is beyond the scope of this article, but let's focus on how React gets the **[JSX](https://reactjs.org/docs/introducing-jsx.html)** code we write and puts that in the DOM.

```js
<div className="my-class">
  Some content here
</div>
```

With React, we normally don't pass an id attribute to the element because we use a declarative way to access methods, instances, props and state. It's through the component's (or the application's) state that we can change how things are represented in the DOM. There's no direct DOM manipulation, so typically there's no need to actually access the DOM.

The React team has given developers ways to access the DOM nodes when needed, and the API changed a bit over the years as React matured. At this time (September, 2018) the latest version of React (16.4.2) allows developers to use Refs to access the DOM nodes. In this guide we'll mainly use the **[Callback Refs](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)** to create a reference to the DOM node and then feed it into GSAP animations because it's much faster for GSAP to directly manipulate properties rather than funneling them through React's state machine.

## Creating Our First Animation

We'll use the **ref** to access the DOM node and the **[componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount)**  lifecycle method of the component to create our first animation, because this will guarantee that the node has been added to the DOM tree and is ready to be passed into a GSAP animation.

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
Not that difficult, right? Let's go through the code so we can understand what is happening.
First when we create an instance of this class, two properties are added to it: `myElement` and `myTween`, but both are equal to null. Why? Because at this point the node has not been added to the DOM tree and if we try to pass this node to a GSAP animation, we'll get an error indicating that GSAP cannot tween a `null` target.

After the new instance has been initialized, the **[render()](https://reactjs.org/docs/react-component.html#render)** method runs. In the render method we're using the **ref** attribute that is basically a function that has a single parameter – the DOM node being added to the DOM tree. At this point we update the reference to the DOM node created in the class constructor. After that, this reference is no longer `null` and can be used anywhere we need it in our component.

Finally, the **[componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount)** method runs and updates the reference to myTween with a **[TweenLite](https://greensock.com/docs/TweenLite)** tween whose `target` is the internal reference to the DOM node that should animate. Simple, elegant and very React-way of us!

It is worth mentioning that we could have created a **one-run-animation** by not creating a reference to the TweenLite tween in the constructor method. We could have just created a tween in the `componentDidMount` method and it would run immediately, like this:

```js
componentDidMount(){
  TweenLite.to(this.myElement, 1, {x: 100, y: 100});
}
```

The main benefit of storing a TweenLite tween as a reference in the component, is that this pattern allows us to use any of the methods GSAP has to offer like: [play()](https://greensock.com/docs/TweenMax/play()), [pause()](https://greensock.com/docs/TweenMax/pause()), [reverse()](https://greensock.com/docs/TweenMax/reverse()), [restart()](https://greensock.com/docs/TweenMax/restart()), [seek()](https://greensock.com/docs/TweenMax/seek()), change the speed ([timeScale](https://greensock.com/docs/TweenMax/timeScale())), etc., to get full control of the animations. Also this approach allows us to create any GSAP animation ([TweenLite](https://greensock.com/docs/TweenLite), [TweenMax](https://greensock.com/docs/TweenMax), [TimelineLite](https://greensock.com/docs/TimelineLite), etc.) in the constructor. For example, we could use a timeline in order to create a complex animation:

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

With this approach we create a paused Timeline in the constructor and add the individual tweens using the shorthand methods. Since the Timeline was paused initially, we play it after adding all the tweens to it. We could also leave it paused and control it somewhere else in our app. The following example shows this technique:

#### SIMPLE TWEEN DEMO
[https://stackblitz.com/edit/gsap-react-simple-tween](https://stackblitz.com/edit/gsap-react-simple-tween)

## Animating a Group of Elements
One of the perks of using React is that allows us to add a group of elements using the `array.map()` method, which reduces the amount of HTML we have to write. This also can help us when creating an animation for all those elements. Let's say that you want to animate a group of elements onto the screen in a staggered fashion. It's simple:

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
        ref={li => this.myElements[index] = li}
      >
        {element.name}
      </li>)}
    </ul>
  </div>;
}
```
This looks a bit more complex but we're using the same pattern to access each DOM node. The only difference is that instead of using a single reference for each element, we add each element to an array. In the **[componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount)** method we use **[TimelineLite.staggerTo()](https://greensock.com/docs/TimelineLite/staggerTo())** and GSAP does its magic to create a staggered animation!

#### MULTIPLE ELEMENTS DEMO
[https://stackblitz.com/edit/gsap-react-multiple-elements](https://stackblitz.com/edit/gsap-react-multiple-elements)

## Creating a Complex Sequence

We won't always get all the elements in an array so sometimes we might need to create a complex animation using different elements. Just like in the first example we store a reference in the constructor for each element and create our timeline in the **[componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount)** method:

#### TIMELINE SEQUENCE DEMO
[https://stackblitz.com/edit/gsap-react-timeline-sequence](https://stackblitz.com/edit/gsap-react-timeline-sequence)

Note how in this example we use a combination of methods. Most of the elements are stored as a an instance property using `this.element = null`, but also we're adding a group of elements using an `array.map()`. Instead of using the `map()` callback to create tweens in the timeline (which is completely possible), we're adding them to an array that is passed in the **[staggerFrom()](https://greensock.com/docs/TimelineLite/staggerToFrom)** method to create the stagger effect.

## Animating Via State

The most commonly used pattern to update a React app is through changing the state of its components. So it's easy to control when and how elements are animated based on the app state. It's not very difficult to listen to state changes and control a GSAP animation depending on state, using the **[componentDidUpdate()](https://reactjs.org/docs/react-component.html#componentdidupdate)** lifecycle method. Basically we compare the value of a state property before the update and after the update, and control the animation accordingly.

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.play !== this.state.play) {
    this.myTween.play();
  }
}
```

#### CONTROL THROUGH STATE DEMO
[https://stackblitz.com/edit/gsap-react-state-control](https://stackblitz.com/edit/gsap-react-state-control)

In this example we compare the value of different state properties (one for each control method implemented in the component) to control the animation as those values are updated. It's important to notice that this example is a bit convoluted for doing something that can be achieved by calling a method directly in an event handler (such as `onClick`). The main idea is to show the proper way of controlling things through the state.

A cleaner and simpler way to control an animation is by passing a **[prop](https://reactjs.org/docs/jsx-in-depth.html#props-in-jsx)** from a parent component or through an app state store such as Redux or MobX. This modal samples does exactly that:

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

As you can see the modal animation is controlled by updating the `visible` prop passed by its parent, as well as a *close* method passed as a prop. This code is far simpler and reduces the chance of error.

#### STATE MODAL DEMO
[https://stackblitz.com/edit/gsap-react-state-modal](https://stackblitz.com/edit/gsap-react-state-modal)

## Using React Transition Group
**[React Transition Group](https://reactcommunity.org/react-transition-group/)**(RTG)  is a great tool that allows another level of control when animating an element in a React app. This is referred to as the capacity to mount and unmount either the element being animated or an entire component. This might not seem like much when animating a single image or a div, but this could mean a significant performance enhancement in our app in some cases.

#### SIMPLE TRANSITION DEMO
[https://stackblitz.com/edit/gsap-react-simple-transition-group](https://stackblitz.com/edit/gsap-react-simple-transition-group)

In this example the **[<Transition>](https://reactcommunity.org/react-transition-group/transition)** component wraps the element we want to animate. This element remains unmounted while it's `show` prop is false. When the value changes to `true`, it is mounted and then the animation starts. Then when the prop is set to `false` again, another animation starts and when this is completed it's unmounted. We can also use the `<Transition>` component to wrap the entire component.

RTG also provides the **[<TransitionGroup>](https://reactcommunity.org/react-transition-group/)** component, which allows us to control a group of `<Transition>` components, in the same way a single `<Transition>` component allows to control the mounting and unmounting of a component. This is a good alternative for animating dynamic lists that could have elements added and/or removed, or lists based on data filtering.

#### TRANSITION GROUP DEMO
[https://stackblitz.com/edit/gsap-react-transition-group-list](https://stackblitz.com/edit/gsap-react-transition-group-list)

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
In this example we use the **[addEndListener()](https://reactcommunity.org/react-transition-group/transition#Transition-prop-addEndListener)** callback from the `<Transition>` component. This gives us two parameters, the `node` element being added in the DOM tree and the `done` callback, which allows to control the inner state of the `<Transition>` component as the element is mounted and unmounted.

The entire animation is controlled by the `in` prop, which triggers the `addEndListener()` and ultimately the animation. You may notice that we're not creating two different animations for the enter/exit state of the component. We create a single animation that uses the same DOM node and the same properties. By doing this, GSAP's overwrite manager kills any existing animation affecting the same element and properties, giving us a seamless transition between the enter and exit animations.

Finally, using RTG allows us for a more fine-grained code, because we can use all the event callbacks provided by GSAP (`onStart`, `onUpdate`, `onComplete`, `onReverse`, `onReverseComplete`) to run all the code we want, before calling the `done` callback (is extremely important to notify that the animation has completed).

## Animating Route Changes
Routing is one of the most common scenarios in a React app. Route changes in a React app means that an entirely different view is rendered depending on the path in the browser's address bar which is the most common pattern to render a completely different component in a route change. Obviously animating those changes gives a very professional look and feel to our React apps. Rendering a new component based on a route change means that the component of the previous route is unmounted and the one for the next route is mounted. We already covered animating components animations tied to mount/unmount using the `<Transition>` component from RTG, so this is a very good option to animate route changes.

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
This main component uses React Router's **[<BrowserRouter>](https://reacttraining.com/react-router/web/api/BrowserRouter)** and **[<Route>](https://reacttraining.com/react-router/web/api/Route)** and checks the `match` object passed as a prop to every `<Route>` component, while returning the component that should be rendered for each URL. Also we pass the `show` property to each component, in the same way we did in the **transition** example.

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

As you can see, the code is basically the same used to animate a single component; the only difference is that now we have two animations happening in different components at the same time.

#### ROUTE ANIMATION DEMO
[https://stackblitz.com/edit/gsap-react-route-animation](https://stackblitz.com/edit/gsap-react-route-animation)

It's worth noting that the animations used in this example are quite simple but you can use any type of animation even [complex, nested animations](https://css-tricks.com/writing-smarter-animation-code/).

As you can see by now, using [GSAP](https://greensock.com/gsap) and [React](https://reactjs.org/) can play together nicely. With all the [tools and plugins](https://greensock.com/plugins/?product_id=4921) GSAP has to offer the sky is the limit for creating compelling and amazing React applications!

## FAQ

1. What is this "Virtual DOM" thing, that is referred so much when it comes to React Apps?. Can GSAP work with this virtual dom?

   **A** The Virtual DOM is what React uses to update the DOM in a fast and efficient way. In order to learn more about it check **[this article](https://medium.freecodecamp.org/a-quick-guide-to-learn-react-and-how-its-virtual-dom-works-c869d788cd44)** and the **[React Docs](https://reactjs.org/docs/faq-internals.html)**. GSAP can't work with the virtual DOM because the elements in the Virtual DOM are not exactly DOM nodes per-se.

2. I often read about the declarative nature of React. Does that affect how we use GSAP in a React APP?

   **A** Yes. React works by updating the rendered DOM through changes in the App state, so when creating an animation using GSAP, instead of reaching out directly to the DOM, like in most other cases, we need to wait for those changes in the app state and the DOM to be rendered, in order to use the current representation of the app state and create the animation. To learn more about how declarative and imperative code work read **[this article](https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2)**.

3. In the second sample I see this code in the ref callback `ref={div => this.cards[i] = div}`. Why is the index being used instead of just pushing the element in the array?

   **A** The reason for that is that every time a React component is re-rendered, the `render` method is executed, but the original instance remains unchanged. The array used to create the animation is created in the component's constructor. The GSAP animation (a TimelineLite) is created in the `componentDidMount` hook. These two elements are created just once in the App's lifecycle, while the render method is executed on every re-render. Therefore if we push the elements to the array on every re-render, even though the Timeline instance won't change, the array will get bigger and bigger every time the component is re-rendered. This could cause a memory issue, especially for large collections.

4. In the guide one of the samples triggers animations via the state of a component or the app. Is it possible to update the state of the component/app using GSAP?

   **A** Absolutely! All you have to do is use one of the many callback events GSAP has to offer. The only precaution is to be aware of infinite loops. That is if an animation is started on the render method of a component and a callback from that animation updates the state of the component then that will trigger a re-render, which will start the animation again. You can check this **[simple example](https://stackblitz.com/edit/gsap-update-state)** of how that can be done.

5. Is it possible to trigger a route change using GSAP?

   **A** It is possible using React Router's API. Although is not recommended because using React Router's API directly will prevent triggering the route change animations when using the browser's *back* and *forward* buttons. However, using React Transition Group with GSAP does trigger the route change animations with the native navigation methods.

6. Can I use other GSAP plugins and tools in a React App? This guide shows only TweenMax, Timeline and the CSS Plugin?

   **A** Yes, any GSAP tool or plugin you want can be used in a React app. Just be sure to follow the same patterns and guidelines from this article and you'll be fine.

7. I tried the code in the guide and samples, but it doesn't work. What can i do?

   **A** Head to the **[GreenSock forums](https://greensock.com/forums/forum/11-gsap/)** where all your questions will be answered as fast as possible.

8. I want to contribute or post an issue to this guide. Where can I do that?

   **A** Even though this guide was reviewed by GreenSock and React experts, perhaps something might have slipped away, or with time and new versions, some things should or could be done differently. For those cases please head to this **[GitHub Repo](https://github.com/rhernandog/gsap-react-guide)** and inform any issues or create a Pull Request with the changes you think should be added.

**New to GSAP?** Check out the **[Getting Started Guide](https://greensock.com/get-started-js)**. Got questions? Head over to the **[GreenSock forums](https://greensock.com/forums/forum/11-gsap/)** where there's a fantastic community of animators.

## Acknowledgments
I'd like to thank the three developers that took time from their work and lives to review this guide as well as the samples in it. I couldn't have done this without their help and valuable input. Please be sure to follow them:

- **Xiaoyan Wang**: A very talented React developer. While Xiaoyan doesn't have a very active social life (twitter, facebook, etc), you can follow what he does in **[GitHub](https://github.com/horizon-blue)**.

- **Jason Quense**: One of the maintainers of React Transition Group and part of the React Bootstrap Team. Jason also collaborates in many other React-related projects. Check Jason's **[GitHub profile](https://github.com/jquense)** for more info.


- **Matija Marohnić**: The most active contributor and maintainer of React Transition Group and Part of the Yeoman Team. Matija also contributes in a lot of React-related projects as well as many other open source software. Be sure to follow Matija in **[GitHub](https://github.com/silvenon)** and **[Twitter](https://twitter.com/silvenon)**.
