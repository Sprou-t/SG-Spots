# Tailwind CSS notes

- how to debug css?

1. single out the issue: is it page specific? component specific? div specific? be as clear as possible

2. use chrome devtool(wei sin's version)

3. for more focused testing can also comment out specific areas while changing css

# React Notes

## 1. Setting Up HMR for Vite

- Enable `usePolling` to make Hot Module Replacement (HMR) work.

## 2. Max Width and Screen Sizing

- **Max Width Issue**: Use `h-screen` and `w-screen` (not recommended because it might lead to horizontal scrolling).

## 3. React's Asynchronous State Update and `setState`

When managing state in React, you need to be mindful of how React batches and updates state asynchronously.

### Example:

````jsx
const [dropdownOpen, setDropdownOpen] = useState(false);

### Updating State - Methods:

#### Method 1: Function Updater

```jsx
setDropdownOpen((prevState) => !prevState);
````

- **Why it works**: This method passes a function to `setDropdownOpen`, where `prevState` represents the most up-to-date value of `dropdownOpen`.
- **Why it's preferred**: Since React batches updates and commits them asynchronously, using a function updater ensures that the state is updated immediately without waiting for the update queue.

#### Method 2: Direct Toggle

```jsx
const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
```

- **Why it works**: The state is updated based on the current value of `dropdownOpen`.
- **Why avoid it**: This method may not work correctly in certain scenarios due to React's asynchronous state updates, where the most recent state value might not be available during updates.

#### Method 3: Direct State Update

```jsx
setDropdownOpen(!dropdownOpen);
```

- **Why it fails**: Since React's state updates are asynchronous, directly updating state this way may lead to unexpected behavior, as it doesn't guarantee access to the most recent value of `dropdownOpen`. This could result in bugs.

---

## 4. React Event Handlers - Anonymous Functions vs Direct Function Passing

### Passing Functions with Arguments

- **Anonymous Function**: Use an anonymous function when the event handler requires an argument.
    ```jsx
    <button onClick={() => handleClick('arg')}>Click me</button>
    ```
- **Why**: The function will be invoked with the correct argument only when the event occurs.

### Passing Functions without Arguments

- **Direct Function Reference**: If the event handler doesn't need an argument, pass the function reference directly.
    ```jsx
    <button onClick={handleClick}>Click me</button>
    ```
- **Why**: Passing the function directly avoids unnecessary wrapping and is more efficient since the function will be invoked when the event occurs.

### Inefficiency of Passing Anonymous Functions Without Arguments

- **Inefficient Example**:
    ```jsx
    <button onClick={() => handleClick()}>Click me</button>
    ```
- **Why it's inefficient**: This approach creates a new anonymous function every time the component re-renders, even though `handleClick` could be passed directly. The unnecessary function wrapping leads to extra computation and can negatively affect performance, especially when there are multiple event handlers.

---

### Mutating states in react

- variable: not using setState function
- object and array function: not using filter, map, concat to create new copies instead of modifying directly

```


```
