const toast = (toastType = { type: 'error', message: 'error occured' }) => {
  let id = Math.random().toString();
  const map = {
    error: `<div class="alert alert-error" id="${id}">${toastType.message}</div>`,
    info: `<div class="alert alert-info" id="${id}">${toastType.message}</div>`,
    warning: `<div class="alert alert-warning" id="${id}">${toastType.message}</div>`,
    success: `<div class="alert alert-success" id="${id}">${toastType.message}</div>`
  };
  const toastBody = document.getElementById('toastBody');
  toastBody.innerHTML = map[toastType.type] || map.error;
  setTimeout(() => { toastBody.removeChild(document.getElementById(id)); }, 1500);
}
