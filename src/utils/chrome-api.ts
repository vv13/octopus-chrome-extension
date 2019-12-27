export type ChromeBookmark = chrome.bookmarks.BookmarkTreeNode;

export const chromeBookmarkGetTree = () => {
  return new Promise<ChromeBookmark[]>(res => chrome.bookmarks.getTree(res));
};
