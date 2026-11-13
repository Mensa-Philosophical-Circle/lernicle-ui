export const getInitials = (forName: string) => {
  if (!forName) return '';

  return forName
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join('');
};
