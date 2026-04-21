# TODO:

✅

## TODO:

- Fix colors:
  - Login screen: light theme ✅
  - Tabs colors on web ✅
- SafeAreaView: remove, it should be in every screen ✅

## Screen 1:

- filter: type ==== story and has url
- FlatList displays:
  - Title
  - Source Domain (parsed from the url)
  - Score
  - Relative Time
- Pull to refresh
- ActivityIndicator on first load
- error state and empty state
- sort toggle, by score or by time (Must survive navigation back)
- Hacker News items have no thumbnails. Display a placeholder

## Screen 2: Article Detail:

- Display: title, author, score, time, and the full URL as a tappable link via Linking.openURL.
- Include a Share button in the header using the React Native Share API.
- Include a Bookmark toggle in the header. Bookmarked state must persist across cold restarts (AsyncStorage or MMKV — state your choice and rationale in the README).
- Navigating back must restore the list to its previous scroll position.

## Bonus (optional — only attempt once the core is solid)

- A third Bookmarks tab (bottom tab navigator) showing saved stories with swipe-to-remove.
- A search bar on Screen 1 with debounced filtering and no additional API calls.
- An offline detection banner when the device has no connectivity.

## Finish:

- iOS
- docs
- video
