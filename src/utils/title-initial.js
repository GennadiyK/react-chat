export default function titleInitials(title) {
  try {
    return title
      .trim()
      .split(' ')
      .map((word) => {
        if (word) {
          return word[0].toUpperCase();
        }
      })
      .slice(0, 2)
      .join('');
  } catch (e) {
    throw new Error(e);
  }
}
