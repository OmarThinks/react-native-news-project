# TODO:

✅

- Filter comments:
  - by type="comment"
  - has a string as a comment
  - length of filtered comments = number of comments

## TODO:

- Act like a field can be missing
  - (from the api call)
  - NewsCard
  - CommentCard
  - Home screen
  - Comment screen
  - a?= ""

## Screen 1:

- FlatList displays:
  - (Take the time to revise the fields)
- error state and empty state
  - error screen
  - use error screen in
    - Home screen
    - details screen
- sort toggle, by score or by time (Must survive navigation back)
- FlatList: show indicator

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

- try again with firebase auth, add db url as an empty string
- test
- revise the fields
- iOS
- docs
- video
