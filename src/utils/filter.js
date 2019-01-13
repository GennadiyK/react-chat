// eslint-disable-next-line
export function filterChats(chats, searchValue) {
  return chats.filter(chat => chat.title.toLowerCase().includes(searchValue));
}
