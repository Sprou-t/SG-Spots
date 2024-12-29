# notes
1. setting up hmr for vite: enable usePolling
2. max width: use h-screen and w-screen(not recommended because it would lead to scrollable horizontally)

3. react's asynchronous update and the usage of setState function

-if we have `const [dropdownOpen, setDropdownOpen] = useState(false);`

- updating the state works w these 2 methods:
    - `setDropdownOpen((prevState) => !prevState);`
    - `const toggleDropdown = () => setDropdownOpen(!dropdownOpen);`

- but not with this
    - `setDropdownOpen(!dropdownOpen);`

* for first method, we are passing setDropdownOpen a function.  This function receives the most up-to-date value of dropdownOpen as prevState. this function is called a function updater. So in react the state updates are queued bf react commits them to the DOM, but passing a function updater ensures that the specific state does not need to be queued and will be updated immediately

* for second method,the idea is abt the same, but try not to use it because in certain cases it might not work.DKDC

* 3rd method: due to asynchronous update of react, we might not get the most updated value of the state, thus the update done in setDropdownOpen might be buggy becuase we are updating an outdated state