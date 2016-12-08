# Protocode v2.0#

Protocode is a web application that helps you to prototype iOS and Android mobile apps. Thanks to its model-driven approach, you can create a prototype app once for different operating systems.

## What's new in v2.0 ##

* __New devices__: Nexus 6P for Android M and iPhone 6, 6 Plus for iOS 9.

* __Smartwatches__: You can now add buttons, labels, switches, sliders and a "speech-to-text" button to your Wearable device! Simulated devices are Apple Watch 42mm, Moto 360 and Asus Zen Watch.

* __New mobile widgets__: Switches, spinners, sliders, mapView, datePickers, timePickers and cardViews are now available.

* __Upgraded mobile widgets__: Added new properties for the widgets like text color, background color and font style; ListViews and GridViews are now available in 3 different layouts : simple text, with an image or both.

## Features from v1.0 ##
Here's a list of the key points of this web application:

* __Widget based prototyping tool__: the user can create the pages that compose the prototype adding various controls such as label, edit texts etc. Now it supports 16 controls: button, label, edit text, web view, image view, video view, audio player, list view, grid view, photocamera controller, videocamera controller and audio recorder.

* __WYSIWYG Editor__: in other word the user can immediately see the final result without exporting the model and generate the project for iOS and Android. This is possible thanks to the built-in simulator of the supported OS. Actually there are two simulators: iPhone 5s for iOS and Nexus 5 for Android.

* __Auto-adaptative control views__: in order to have a responsive layout throughout all different operating system, the position of the controls are not given by absolute position, but it uses a constraint-based approach. The result is a responsive layout that auto-adjust on different mobile screens. The classic position system is allowed even if it's not recommended.

* __Drag & Drop positioning__: controls can be placed on screen via drag & drop. We can move the widgets on the simulator dragging them on it.

* __Easy creation of common functionalities__: how many times we have to spend a lot of time to create menus, tab bars on iOS, navigational behavior and listItems? All these aspect are very simplified and their creation require very few clicks!

## Requirements ##

In order to deploy the web application we need:

* [Node.js](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/)
* [Compass](http://compass-style.org/)
* [MobileCodeGenerator](https://github.com/aldopolimi/mobilecodegenerator): this app is required to generate both iOS and Android projects from the model exported by Protocode.

## Installation ##

1. Download this project
2. Install all node.js dependencies. From the root of the project execute `npm install`
3. Install all front-end libraries using bower `bower install`
4. Start the server using grunt `grunt serve`
5. That's it! Now you have a server with this application up and running on [localhost:9000](http://localhost:9000)
6. If you want only minified and compressed version of this web application, just execute in the root of the project `grunt build`. Now you have in `/PROJECT_PATH/dist` the web application ready for distribution.

## External Links ##

[Protocode v1.0](https://github.com/deib-polimi/protocode/)
