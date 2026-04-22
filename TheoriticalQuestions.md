# Theoretical Questions:

## 1) Bridge vs JSI & The New Architecture:

- Bridge:
  - was about creating a JSON about the whole app, and edits to JSON reflect the C++ and the native app
  - Bridge was Async, so it was slow
- JSI and the new architecture
  - JSI: JavaScript Interface
  - It's a JS interface that enables us to read and write directly to the C++ and natives
  - It's faster as Sync
- Which one is better:
  - JSI and the new architecture

## 2) Diagnosing a Janky FlatList:

- Diagnosis:
  - JavaScript debugger
    - Reading logs
    - Profiling, to know how much time did each re-render cost, and what was the trigger
  - Performance monitor in Expo Go and development build to check the FPS
- We can follow the instructions here: https://reactnative.dev/docs/optimizing-flatlist-configuration
- By adding props to control the performance of the FlatList
- Also, we can use FlashList (Created by shopify)

## 3) useCallback and useMemo:

- Since React 19.2.0 (React Compiler), everything is memoized by default
- All the components are already `memo`, all the variables, are already `useMemo`, and all the functions inside a component are already using `useCallback`
- So, the react compiler doesn't run the code we write directly, it compiles it and fills it useMemo and useCallback
- we can also use them manually if we want
- useMemo: Is used inside components to memoize values, and cache them.
  - For example, a calculation can be O(N^2), but when we memoize it, it becomes O(1)
- useCallback: is used to memoize functions and components, to prevent them from being re-defined all over on every re-render
- Cons: Not too much cons, they only reduce readability by little

## 4) State Management Decision:

- Use Redux (RTK: Redux Toolkit)
- For API integration, use RTKQuery or React Query
- What can change my mind:
  - I want this for scalable apps
  - Maybe a senior developer will order me to use a specific technology, so I must be agnostic to the technology used
  - Or maybe there is a standard in the company that I have to follow

## 5) Offline-First UX Strategy:

- If the user interacts with the app offline, and we want to send his interactions later when he is connected to the internet, we can use AsyncStorage or SQLite to store his offline interactions
- Then when the internet is connected, when can aggregate this data, and send them
- We can react query, and integrate it with AsyncStorage to store and cache the API calls and responses
