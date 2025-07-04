# React 2025 (v19.1.0) (WIP)

This is a demo to use all hooks in reactJS

## Version

```
"react": "^19.1.0",
"react-dom": "^19.1.0"
```

## Hooks

1. useActionState

usage: to update state based on form action

```
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

2. useCallback

usage: to cache function between re-renders, using with memo, in order to reduce re-rendering times of child component while passing cached function to child

```
const cachedFn = useCallback(fn, dependencies);

const childComponent = memo(({cachedFn})=>{...})
```

3. useContext

usage: to share context (created with createContext from somewhere else) to any components (all components will be re-render if that context is changed starting from Provider) in order to avoid prop drilling

```
const ThemeContext = createContext(null); // export it or define it on the same scope with the component that will call useContext

<ThemeContext value='dark'>
...
</ThemeContext>

//component inside ThemeContext 
const theme = useContext(ThemeContext); // theme = 'dark'
```

4. useDebugValue

usage: to label value to react dev tools

```
useDebugValue(value)
```