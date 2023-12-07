## **Gh**erkin **ID** **Gen**erator
[![version](https://img.shields.io/npm/v/ghidgen)](https://www.npmjs.org/package/ghidgen)

**Gh**erkin **ID** **Gen**erator

### A simplest quick hash generator for Gherkin scenarios with colored output

Receives a prefix and generate a short hash using it and current time using [short-hash](https://www.npmjs.com/package/short-hash)

*Example*: *@ABCf178f8bf*

<img src="https://github.com/eugs/ghidgen/blob/main/assets/gif/upd-demo.gif?raw=true" width="700">


You can just copy generated code from the console or update your scenario automatically

### Why?
To generate a short ids for Cucumber scenarios which may help to find them easier in TAF (when added as a Cucumber tag)

### Configure
```
npx ghidgen
```

*Add features folder*

*Add product code (if desired)*

### Usage

#### To update a scenario 
```
npx ghidgen upd
```

*Provide scenario name*


#### To just generate a Cucumber tag
```
npx ghidgen gen
```


### Additional

#### To update features folder
```
npx ghidgen dir
```

#### To set a new product code
```
npx ghidgen code
```
