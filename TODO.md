# TODO:

✅

## TODO:

## Screen 1:

- FlatList displays:
  - (Take the time to revise the fields)
- sort toggle, by score or by time (Must survive navigation back)
  - Component: ToggleButton {cases:{id: string, text: string, iconName: string }[], isActive: boolean, activeId: string, setActiveId: (a: string)=>void, defaultId: string }
  - 2 buttons:
    - score
    - date
  - use the buttons in Home screen, and in bookmarks screen
  - logic for sorting the data
  - when one is activated, the other is not activated

## Screen 2: Article Detail:

- Include a Share button in the header using the React Native Share API.
- Include a Bookmark toggle in the header. Bookmarked state must persist across cold restarts (AsyncStorage or MMKV — state your choice and rationale in the README).
- Navigating back must restore the list to its previous scroll position.

## Bonus (optional — only attempt once the core is solid)

- A third Bookmarks tab (bottom tab navigator) showing saved stories with swipe-to-remove.
- A search bar on Screen 1 with debounced filtering and no additional API calls.
- An offline detection banner when the device has no connectivity.
- On logout: reset bookmarks

## Finish:

- try again with firebase auth, add db url as an empty string
- test
- revise the fields
- iOS
- docs
- video
