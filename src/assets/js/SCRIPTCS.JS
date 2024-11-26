// compra-scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        // Validación básica del formulario
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const quantity = document.getElementById('quantity').value;

        if (!name || !email || !address || quantity <= 0) {
            alert('Por favor, completa todos los campos correctamente.');
            event.preventDefault();
        } else {
            // Evitar la acción predeterminada del formulario
            event.preventDefault();
            
            // Mostrar mensaje de éxito
            alert('Compra realizada con éxito. ¡Gracias por tu compra!');
            
            // Aquí puedes agregar cualquier otra acción necesaria, como redirigir al usuario o limpiar el formulario
            form.reset();
        }
    });
});
