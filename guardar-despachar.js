const scriptURL_Empresa = 'https://script.google.com/macros/s/AKfycbzhPW0E0oZsEZcRZ3y1gKTjcu47ROOTS12PkiGdMka2IilKsvNGMdzO4kGbdEy7tL-GNw/exec';

function handleFormSubmitSimple(formId, loaderId, scriptURL) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const loader = document.getElementById(loaderId);
    loader.style.display = 'block';

    setTimeout(() => {
      fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
      })
      .then(response => {
        if (response.ok) {
          alert('Datos enviados correctamente.');
          form.reset();
        } else {
          alert('Error al enviar el formulario.');
        }
      })
      .catch(error => alert('Error: ' + error.message))
      .finally(() => {
        loader.style.display = 'none';
      });
    }, 1000);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  handleFormSubmitSimple('empresaForm', 'loaderEmpresa', scriptURL_Empresa);
});

