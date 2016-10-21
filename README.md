## A* implementation for a Node.js hackaton
 
This project is a solution for the challenge proposed during [IceMobile](https://icemobile.com/)'s _The Walking Dead_ Node.js Hackaton.

### Running the project

Install the module dependencies:

```
npm install
```

Run the application:

```
npm start
```

### Testing

You can run the unit tests with:

```
npm test
```

### Documentation

You can generate the JSDoc documentation with the following `npm` script:

```
npm run-script jsdoc
```

The documentation will be present in the folder `docs/jsdoc`.

### Solution

Normal squares: 200 ms, zombie adjacent squares: 400 ms

```
> node index.js

 Found a path in 25 steps: C1 -> C2 -> B2 -> B3 -> B4 -> B5 -> B6 -> B7 -> C7 
    -> C8 -> D8 -> E8 -> F8 -> G8 -> G9 -> H9 -> I9 -> I8 -> I7 -> I6 -> I5 
    -> I4 -> J4 -> K4 -> K5
 Total cost: 5000 ms.

 ██a█████████
 █ · █w   █ █
 █·· █  █ █ █
 █·████ █   █
 █· w   █···█
 █·   w █·█·█
 █· w█  █·███
 █·· ████·█ █
 █ ·····█·█ █
 █w  █ ···  █
 ████████████

```

Normal squares: 200 ms, zombie adjacent squares: 200 ms

```
> SQUARE_SPEED_WITH_ZOMBIES=200 node index.js
 
 Found a path in 23 steps: C1 -> C2 -> B2 -> B3 -> B4 -> B5 -> C5 -> D5 -> E5 
    -> E4 -> F4 -> G4 -> G3 -> G2 -> G1 -> H1 -> I1 -> I2 -> I3 -> I4 -> J4 
    -> K4 -> K5
 Total cost: 4600 ms.

 ██a█████████
 █ · █w···█ █
 █·· █ ·█·█ █
 █·████·█·  █
 █· w···█···█
 █····w █ █·█
 █  w█  █ ███
 █   ████ █ █
 █      █ █ █
 █w  █      █
 ████████████
```