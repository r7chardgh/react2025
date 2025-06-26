# React 2025 ()

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
```
