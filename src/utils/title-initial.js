export default function titleInitials (title) {
  try {
    return title
      .split(' ')
      .map((word) => {
        return word[0].toUpperCase()
      })
      .slice(0, 2)
      .join(' ');
  } catch (e) {
    console.error(e);
  }

}