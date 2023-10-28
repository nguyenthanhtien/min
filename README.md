# Basic Vite Project For React

Simple Vite project for React with some basic structure folder

## Table of contents

- [General info](#general-info)
- [Folder structure](#folder-structure)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This project is a simple project on how to design a structured folder in Vite and React and how to create some basic components with Tailwind.

## Folder structure

    .
    ├── ...
    ├── src
    │   ├── assets
    │   ├── components
    │   ├── config
    │   ├── pages
    │   ├── routes
    │   ├── services
    │   ├── utils
    │   └── wrappers
    └── ...



### Assets folder

As the name says, it contains assets of our project. It consists of images and styling files. Here we can store our global styles. We are centralizing the project so we can store the page-based or component-based styles over here. But we can even keep style according to the pages folder or component folder also. But that depends on developer comfortability.

### Components folder

Components are the building blocks of any react project. This folder consists of a collection of UI components like buttons, modals, inputs, loader, etc., that can be used across various files in the project

### Config folder

This folder consists of a configuration file where we store environment variables in config.js. We will use this file to set up multi-environment configurations in your application.

### Pages folder

The files in the pages folder indicate the route of the react application. Each file in this folder contains its route. A page can contain its subfolder. Each page has its state and is usually used to call an async operation. It usually consists of various components grouped

### Routes folder

This folder consists of all routes of the application. It consists of private, protected, and all types of routes. Here we can even call our sub-route.

### Services folder

This folder will be added if we use redux in your project. Inside it, there are 3 folders named actions, reducers, and constant subfolders to manage states. The actions and reducers will be called in almost all the pages, so create actions, reducers & constants according to pages name.

### Utils folder

Utils folder consists of some repeatedly used functions that are commonly used in the project. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.

### Wrappers folder

This directory includes of some the HOCs components and Provider components

## Technologies

Project is created with:

- "vite": "^4.3.9"
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-router-dom": "^6.13.0",
- "sass": "^1.63.3",
- "tailwindcss": "^3.3.2",

## Setup

To run this project, install it locally using npm:

```
$ git clone https://github.com/lytrant/react-n-tailwind.git .
$ cd vite-react-tailwind
$ npm install
$ npm run dev
```

To build this project:

```
$ npm run build
```
