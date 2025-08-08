const scriptURL_Empresa = 'https://script.google.com/macros/s/AKfycbzhPW0E0oZsEZcRZ3y1gKTjcu47ROOTS12PkiGdMka2IilKsvNGMdzO4kGbdEy7tL-GNw/exec';
const scriptURL_Repartidor = 'https://script.google.com/macros/s/AKfycbxxYI85VDSdZxxlDtmK7nG7bxitMKcyQ8TKa-45J3FOmbQL8Bo1ngAmdnkm6_5T4L7j/exec'; // Reemplaza esta URL


function hideSplash() {
document.getElementById('splash').classList.add('hidden');
}

function openModal(modalId) {
document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
document.getElementById(modalId).style.display = 'none';
}

function handleFormSubmit(formId, loaderId, modalId, scriptURL) {
document.getElementById(formId).addEventListener('submit', e => {
 e.preventDefault();
 const loader = document.getElementById(loaderId);
 loader.style.display = 'block';

 setTimeout(() => {
     fetch(scriptURL, {
         method: 'POST',
         body: new FormData(e.target)
     })
     .then(response => {
         if (response.ok) {
             alert('Datos Enviado Correctame.');
             e.target.reset();
             closeModal(modalId);
         } else {
             alert('Error al enviar el formulario.');
         }
     })
     .catch(error => alert('Error: ' + error.message))
     .finally(() => {
         loader.style.display = 'none';
     });
 }, 1500);
});
}

// Llamadas separadas para cada formulario
handleFormSubmit('empresaForm', 'loaderEmpresa', 'modalEmpresa', scriptURL_Empresa);
handleFormSubmit('repartidorForm', 'loaderRepartidor', 'modalRepartidor', scriptURL_Repartidor);


  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      const splash = document.querySelector('.splash');
      if (splash) {
        splash.style.display = 'none';
      }
    }, 2000); // 2000 ms = 2 segundos
  });

  function toggleMenu() {
    const menu = document.getElementById('sliderMenu');
    menu.classList.toggle('open');
  }

// ✅ Oculta el splash después de cargar la página
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  if (splash) {
    splash.style.opacity = 1;
    splash.style.transition = 'opacity 0.5s ease';
    splash.style.opacity = 0;
    setTimeout(() => splash.style.display = 'none', 500);
  }
});
