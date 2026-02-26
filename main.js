document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const form = document.getElementById("rsvpForm");

  const plusOne = document.getElementById("plusOne");
  const plusOneFields = document.getElementById("plusOneFields");

  const giftCheck = document.getElementById("giftCheck");
  const bankInfo = document.getElementById("bankInfo");

  // Datos evento
  const eventPlace = "IL FORNO - MALL PLAZA OESTE";
  const eventDate = "Viernes 27 de marzo 2026";
  const eventTime = "12:30 hrs";

  // ✅ Fecha límite (cámbiala si quieres)
  const deadline = "Lunes 16 de marzo 2026";

  // Mostrar fecha límite en pantalla
  const deadlineDateEl = document.getElementById("deadlineDate");
  if (deadlineDateEl) deadlineDateEl.textContent = deadline;

  // Animación entrada (si tienes CSS para .show)
  setTimeout(() => {
    if (card) card.classList.add("show");
  }, 200);

  // Acompañante: mostrar/ocultar
  plusOne.addEventListener("change", () => {
    const show = plusOne.value === "Sí";
    plusOneFields.classList.toggle("hidden", !show);

    if (!show) {
      document.getElementById("plusMeal").value = "";
      document.getElementById("plusDrink").value = "";
    }
  });

  // Transferencia: solo mostrar datos si check está marcado
  giftCheck.addEventListener("change", () => {
    bankInfo.classList.toggle("hidden", !giftCheck.checked);
  });

  // Envío WhatsApp
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const attendance = document.getElementById("attendance").value;
    const meal = document.getElementById("meal").value;
    const drink = document.getElementById("drink").value;

    // Validación básica
    if (!name || !attendance || !meal || !drink) {
      alert("Por favor completa nombre, asistencia, plato y bebida.");
      return;
    }

    // Si hay acompañante, exigir sus opciones
    let plusMeal = "";
    let plusDrink = "";
    if (plusOne.value === "Sí") {
      plusMeal = document.getElementById("plusMeal").value;
      plusDrink = document.getElementById("plusDrink").value;

      if (!plusMeal || !plusDrink) {
        alert("Selecciona el plato y bebida del acompañante.");
        return;
      }
    }

    let message =
`Confirmación de Asistencia 💌

📍 Evento:
Lugar: ${eventPlace}
Fecha: ${eventDate}
Hora: ${eventTime}

⏳ Confirmar asistencia hasta: ${deadline}

Invitado:
Nombre: ${name}
Asiste: ${attendance}
Plato: ${meal}
Bebida: ${drink}
`;

    if (plusOne.value === "Sí") {
      message +=
`
Acompañante:
Asiste: Sí
Plato: ${plusMeal}
Bebida: ${plusDrink}
`;
    }

    message += `
Aporte por transferencia: ${giftCheck.checked ? "Sí" : "No"}
`;

    // Si marcó transferencia, agregar los datos al mensaje
    if (giftCheck.checked) {
      const bankText = bankInfo.innerText
        .replace(/\n{2,}/g, "\n")
        .trim();

      message += `
------------------------
${bankText}
`;
    }

    // ✅ WhatsApp
    const phone = "56932382022"; // cambia si es otro número
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  });
});