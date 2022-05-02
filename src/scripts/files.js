/*
    const data = JSON.stringify({ paths, markers }, null, 2);
    save(data);
*/
export const save = (data = [], opts = { type: 'application/json', filename: 'data.json' }) => {
  const { type, filename } = opts;
  const blob = new Blob([data], { type });

  if (!window || !document) return;
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
};
