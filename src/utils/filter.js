export function filterChats (chat, searchValue) {
  return chat.filter((chat) => chat.title.toLowerCase().includes(searchValue))
}