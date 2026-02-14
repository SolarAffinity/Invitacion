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

  // Animación entrada
  setTimeout(() => {
    card.classList.add("show");
  }, 200);

  // Acompañante
  plusOne.addEventListener("change", () => {
    plusOneFields.classList.toggle("hidden", plusOne.value !== "Sí");
  });

  // Transferencia
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

    let message = `
Confirmación de Asistencia 💌

📍 Evento:
Lugar: ${eventPlace}
Fecha: ${eventDate}
Hora: ${eventTime}

Invitado:
Nombre: ${name}
Asiste: ${attendance}
Plato: ${meal}
Bebida: ${drink}
`;

    if (plusOne.value === "Sí") {
      const pMeal = document.getElementById("plusMeal").value;
      const pDrink = document.getElementById("plusDrink").value;

      message += `
Acompañante:
Asiste: Sí
Plato: ${pMeal}
Bebida: ${pDrink}
`;
    }

    message += `
Aporte por transferencia: ${giftCheck.checked ? "Sí" : "No"}
`;

    const phone = "56932382022"; // reemplazar
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  });
});
