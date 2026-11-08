(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const defaultLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправка…";

      const payload = Object.fromEntries(new FormData(form).entries());

      try {
        const res = await fetch("https://formsubmit.co/ajax/mike.6688@yandex.ru", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("send failed");
        }

        form.reset();
        alert("Спасибо! Заявка отправлена. Мы свяжемся с вами в рабочее время.");
      } catch {
        alert(
          "Не удалось отправить заявку. Напишите на mike.6688@yandex.ru или позвоните +7 (918) 403-41-18."
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultLabel;
      }
    });
  }
})();
