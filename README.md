# Mini App Peg Solitaire

## Overview

This Mini App is a puzzle game called Peg Solitaire (https://en.wikipedia.org/wiki/Peg_solitaire).
You have several levels to choose from. The goal of each level is to leave a single peg in the center of the field. 
The game is over when there is only one peg left, or when there are no more possible moves.

## Installation

Clone repository:
```sh
git clone https://github.com/KLdevelop/webapp-peg
```
Install dependencies:
```sh
npm i
```
Build project:
```sh
npm run build
```
The build is placed in dist directory.

The build was tested for node.js 16.20.2

## Project structure

 * /config - webpack config
 * /dist - build directory
 * /public - html template
 * /src - main directory
    * /assets
        * /fonts
    * /components - react components
        * /ContentModal - custom modal with common styles
        * /LevelsModal - level selection modal
        * /PegField - component with field of pegs and game logic
    * /data/levels - game levels
    * /pages
        * /GamePage - main page
    * types - type directory
    * utils - helper functions

## Try it in telegram

[@peg_game_bot](https://t.me/peg_game_bot)

## License

MIT
