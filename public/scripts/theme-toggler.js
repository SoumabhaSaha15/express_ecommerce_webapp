document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'winter';
  document.documentElement.setAttribute('data-theme', savedTheme);
});

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'winter' ? 'dark' : 'winter';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}