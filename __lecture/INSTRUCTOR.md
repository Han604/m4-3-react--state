# 4.3.1 React State

---

## 🏠Housekeeping: Composing styles

Is there a better way to write this?

```js live=true
const Button = styled.button`
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  background: #EEE;
`;

const BlueButton = styled(button)`
  background: #2B00D7;
  color: #FFF;
`

render(<>
  <Button>Button 1</Button>
  <BlueButton>Button 2</BlueButton>
</>)
```

---

## Exercise

What does the `&` signify, in this snippet?

```jsx
const ListItem = styled.li`
  border-bottom: 1px solid;

  &:last-of-type {
    border-bottom: none;
  }
`
```

---
# 4.3.2 React State

---

## Application state

State is _dynamic data_. Things that change.

---

## Example

```jsx live=true
const Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  )
}

render(<Counter />)
```

---

# Deconstruction

These snippets are identical:

```jsx
// Using deconstruction:
const [value, setValue] = React.useState(null);
```

```jsx
// Without deconstruction:
const valueState = React.useState(null);
const value = valueState[0];
const setValue = valueState[1];
```

---

# `useState`

"useState" is a **React hook**.

Hooks are way of "hooking into" React's abilities, like managing state.

---


# 🙅‍♀️ Mutating state

This snippet won't throw an error, but it also won't work:

```jsx
let [value, setValue] = React.useState(null);

value = 10;

let [value, setValue] = React.useState(10);
//all fixed!
```

---

# Re-rendering

When you call the state setter, it _triggers a re-render_.

This is why the values on the screen change.

---

# Forms in React

---

`value` and `onChange`

```jsx live=true
const Name = () => {
  const [name, setName] = React.useState('');

  return (
    <div style={{ fontSize: 32 }}>
      <input
        type="text"
        value={name}
        onChange={ev => {
          setName(ev.target.value);
        }}
        style={{ fontSize: 32 }}
      />
      <p>Your name is {name}</p>
    </div>
  )
}

render(<Name />)
```

<!--
// Extra Information...

- `onChange` takes a function that receives the "event". This is an object that holds data about what just happened.
- One of those pieces of data is the "target", the DOM node that the event was triggered on.
- Input DOM nodes have a `value` property, which holds the newly-set value

By calling `setName` with `ev.target.value`, we ensure that React is kept in sync with the value being put in this text input.
-->

---

# Exercises

What is logged in the following scenarios?

---

The button is clicked **3 times**:

```jsx live=true inline=true
function SomeComponent() {
  const [count, setCount] = React.useState(10);

  console.log(count);

  return (
    <button onClick={() => setCount(count + 1)}>
      One, Two, Three!
    </button>
  )
}
```

---

The user types "!" in the input

```jsx live=true inline=true
function SomeComponent() {
  const [thing, setThing] = React.useState("Hi");

  console.log(thing);

  return (
    <input
      value={thing}
      onChange={(ev) =>
        setThing(ev.target.value)
      }
    />
  )
}
```

---

The user types "123" in the input

```jsx live=true inline=true
function SomeComponent() {
  const [thing, setThing] = React.useState(0);

  console.log(thing);

  return (
    <input
      value={thing}
      onChange={(ev) =>
        setThing(
          thing +
          Number(ev.target.value)
        )
      }
    />
  )
}
```

---

The user clicks the checkbox

```jsx live=true inline=true
function SomeComponent() {
  const [agreed, setAgreed] = React.useState(false);

  console.log(agreed);

  return (
    <label>
      <input
        type="checkbox"
        checked={agreed}
        onChange={(ev) =>
          setAgreed(!agreed)
        }
      />
      Yes I want to receive spam
    </label>
  )
}
```
---

# State and Props

---

What happens when you want to share state between components?

---

```jsx
const App = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <>
      <SearchInput 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}/>
      <SearchResults />
    </>
  )
}

const SearchInput = ({searchTerm, setSearchTerm}) => {
  

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(ev) => {
        setSearchTerm(ev.target.value);
      }}
    />
  );
}

const SearchResults = (searchTerm) => {
  // ??
}
```

---

This is called "lifting state up".

---

# Exercises

Lift state up in the following examples

---

```jsx live=true
const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <>
      The current count is: {count}

      <Counter 
        count = {count}
        setCount = {setCount}
        />
    </>
  )
}

const Counter = ({count, setCount}) => {
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  )
};


render(<App />)
```

---

```jsx live=true
const FavouriteFood = ({ setFood }) => {
      return (
    <>
      <label>
        <input
          type="radio"
          name="food"
          value="pizza"
          checked={food === 'pizza'}
          onChange={() => setFood('pizza')}
        />
        Pizza
      </label>
      <label>
        <input
          type="radio"
          name="food"
          value="broccoli"
          checked={food === 'broccoli'}
          onChange={() => setFood('broccoli')}
        />
        Broccoli
      </label>
    </>
  )
};

const App = () => {
    const [food, setFood] = React.useState('');
  return (
    <>
      My favourite food is: food
      <br /><br />
      <FavouriteFood 
        food={food}
        setFood={setFood}/>
    </>
  )
}

render(<App />)
```

---

### Conditional rendering

---

```jsx live=true inline=true
() => {
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <>
      <h3>What do you call someone with no body and no nose?</h3>

      {showAnswer && (
        <p>Nobody knows!</p>
      )} 
      
      <button onClick={() => setShowAnswer(true)}>
        Show punchline
      </button>
    </>
  )
}

```

---
# 4.3.3 React Class Components

---

# History

React was released in 2013.

There have been a few iterations. Until quite recently, the main way to create components was with **classes**.

---

```jsx live=true
class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    }
  }

  render() {
    return (
      <>
        Count: {this.state.count}

        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1
            })
          }}
        >
          Increment
        </button>
      </>
    )
  }
}

render(<Counter />)
```

---

# Don't worry too much

We're focusing on _hooks_ in this course.

Hooks can _only_ be used inside **function components**

---

It's important to be aware of classes, since many online resources will use them.

---

# Cheatsheet

```jsx
const [count, setCount] = React.useState(0);

// Initialization
React.useState(0) === this.state = { count: 0 }

// Accessing the state value
count === this.state.count

// Updating the state value
setCount(count + 1) === this.setState({ count: this.state.count + 1 })
```

---

# Exercise

Determine what gets rendered

---

```jsx live=true clickToReveal=true
class Temperature extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      t: 32,
    }
  }

  render() {
    return (
      <p>
        Temperature: {this.state.t + 5}
      </p>
    )
  }
}

render(<Temperature />)
```

---


```jsx live=true clickToReveal=true
class Temperature extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      t: this.props.initialT,
    }
  }

  render() {
    // Not actually the right formula
    const temperatureInFahrenheit =
      this.state.t * 0.5 + 32;

    return (
      <p>
        Temperature: {temperatureInFahrenheit}
      </p>
    )
  }
}

render(<Temperature initialT={-10} />)
```

---

After clicking the button **once**.

```jsx live=true clickToReveal=true
class Temperature extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      t: this.props.initialT,
    }
  }

  render() {
    // Not actually the right formula
    const temperatureInFahrenheit =
      this.state.t * 0.5 + 32;

    return (
      <div>
        <p>Temperature: {temperatureInFahrenheit}</p>
        <button
          onClick={() => this.setState({
            t: this.state.t + 10
          })}
        >
          Make it hotter
        </button>
      </div>
    )
  }
}

render(<Temperature initialT={0} />)
```

---
# 4.3.4 Building a Toggle

---

# What is a Toggle?

<img src='./assets/md-toggle.gif' style='width: 450px' />

UI widget similar to a **checkbox**

---

React is _great_ for these types of UI widgets.

Let's build one together!

---

### Requirements

```
- Receives `checked` and `handleChange` props
- Works on click: invokes the function, ball slides from side to side
- Is keyboard accessible
- Works with a screen reader
```

[Go!](https://codesandbox.io/s/toggle-activity-p4fsc)
