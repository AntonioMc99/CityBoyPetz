/* ================================
   City Boy Petz — script.js
   ================================ */
(() => {
  // ---------- Utilities ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const STORAGE_KEY = "bookings";

  const readBookings = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const writeBookings = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  // Formats YYYY-MM-DD + HH:mm into a readable string in local time
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const [hh, mm] = timeStr.split(":").map(Number);
    const dt = new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0);
    return dt.toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // ---------- DOM Ready ----------
  document.addEventListener("DOMContentLoaded", () => {
    // Form + confirmation
    const form = $("#booking-form");
    const confirmation = $("#confirmation");

    // Optional admin table (guarded)
    const bookingsTable = $("#bookings-table");
    const tbody = bookingsTable ? $("#bookings-table tbody") : null;

    // Optional action buttons (guarded)
    const clearBtn = $("#clear-bookings");
    const exportBtn = $("#export-bookings");

    // Mobile menu
    const menuToggle = $("#menu-toggle");
    const menu = $("#menu");

    // Testimonials
    const testimonialText = $("#testimonial-text");
    const testimonialAuthor = $("#testimonial-author");
    const testimonials = [
      { text: "“City Boy Petz made my son’s birthday unforgettable!”", author: "– Sarah J." },
      { text: "“A fun and safe way to teach kids about animals.”", author: "– Coach Terrence" },
      { text: "“Incredible presentation and animal variety!”", author: "– Principal Monroe" },
    ];

    // ---------- Form Validation ----------
    const validators = {
      name: (v) => v.trim().length >= 2 || "Please enter your full name.",
      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email.",
      date: (v) => {
        if (!v) return "Please select a date.";
        const today = new Date();
        const chosen = new Date(v + "T00:00:00");
        // Allow today or future
        if (chosen.setHours(0, 0, 0, 0) < new Date(today.setHours(0, 0, 0, 0)))
          return "Please choose today or a future date.";
        return true;
      },
      time: (v) => !!v || "Please select a time.",
      reason: (v) => v.trim().length >= 5 || "Please add a brief reason (5+ characters).",
    };

    const setFieldError = (input, message) => {
      // ensure or find an error span
      let err = input.nextElementSibling;
      if (!err || !err.classList.contains("field-error")) {
        err = document.createElement("div");
        err.className = "field-error";
        err.style.color = "#d62014";
        err.style.fontSize = "0.9rem";
        err.style.marginTop = "0.25rem";
        input.insertAdjacentElement("afterend", err);
      }
      if (message) {
        input.setAttribute("aria-invalid", "true");
        err.textContent = message;
        err.style.display = "block";
      } else {
        input.removeAttribute("aria-invalid");
        err.textContent = "";
        err.style.display = "none";
      }
    };

    const validateForm = () => {
      if (!form) return false;
      const fields = ["name", "email", "date", "time", "reason"];
      let valid = true;
      fields.forEach((id) => {
        const input = $("#" + id);
        if (!input) return;
        const rule = validators[id];
        const value = input.value || "";
        const result = rule ? rule(value) : true;
        if (result !== true) {
          valid = false;
          setFieldError(input, result);
        } else {
          setFieldError(input, "");
        }
      });
      return valid;
    };

    // Live validation feedback
    ["name", "email", "date", "time", "reason"].forEach((id) => {
      const el = $("#" + id);
      if (!el) return;
      el.addEventListener("blur", validateForm);
      el.addEventListener("input", () => {
        // only clear error as user types
        const rule = validators[id];
        const result = rule ? rule(el.value || "") : true;
        setFieldError(el, result === true ? "" : result);
      });
    });

    // ---------- Bookings Rendering ----------
    const renderBookings = () => {
      if (!tbody) return; // No admin table on this page
      const bookings = readBookings();
      tbody.innerHTML = "";
      if (!bookings.length) {
        const row = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 6;
        td.textContent = "No bookings yet.";
        td.style.opacity = "0.8";
        row.appendChild(td);
        tbody.appendChild(row);
        return;
      }

      bookings.forEach((b, idx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${escapeHTML(b.name)}</td>
          <td>${escapeHTML(b.email)}</td>
          <td>${escapeHTML(b.date)}</td>
          <td>${escapeHTML(b.time)}</td>
          <td>${escapeHTML(b.reason)}</td>
          <td><button type="button" class="btn btn-small" data-index="${idx}" aria-label="Delete booking ${idx +
            1}">Delete</button></td>
        `;
        tbody.appendChild(row);
      });

      // Hook delete buttons
      $$(".btn.btn-small", tbody).forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = Number(btn.getAttribute("data-index"));
          const list = readBookings();
          list.splice(i, 1);
          writeBookings(list);
          renderBookings();
        });
      });
    };

    // Simple HTML escape for rendering content
    const escapeHTML = (str) =>
      String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    // ---------- Form Submit ----------
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const booking = {
          id: crypto?.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          name: $("#name").value.trim(),
          email: $("#email").value.trim(),
          date: $("#date").value,
          time: $("#time").value,
          reason: $("#reason").value.trim(),
          createdAt: new Date().toISOString(),
        };

        const bookings = readBookings();
        bookings.push(booking);
        writeBookings(bookings);

        const nice = formatDateTime(booking.date, booking.time);
        if (confirmation) {
          confirmation.textContent = `Thanks, ${booking.name}! Your request for ${nice} has been received. We'll reach out by email.`;
          confirmation.classList.remove("hidden");
          confirmation.setAttribute("role", "status");
        }

        form.reset();
        renderBookings();

        // Smooth scroll to confirmation if off-screen
        if (confirmation) {
          const y = confirmation.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    }

    // ---------- Export & Clear (optional) ----------
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const bookings = readBookings();
        if (!bookings.length) return alert("No bookings to export.");
        const header = ["Name", "Email", "Date", "Time", "Reason", "Created At"];
        const rows = bookings.map((b) => [
          b.name,
          b.email,
          b.date,
          b.time,
          b.reason.replaceAll(/\n/g, " "),
          b.createdAt,
        ]);
        const csv = [header, ...rows]
          .map((r) =>
            r
              .map((cell) => {
                const s = String(cell ?? "");
                // Quote + escape quotes if needed
                return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
              })
              .join(",")
          )
          .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cityboypetz_bookings.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (confirm("Clear ALL saved bookings? This cannot be undone.")) {
          writeBookings([]);
          renderBookings();
        }
      });
    }

    // ---------- Mobile Menu ----------
    if (menuToggle && menu) {
      menuToggle.addEventListener("click", () => {
        const isHidden = menu.classList.toggle("hidden");
        menuToggle.setAttribute("aria-expanded", String(!isHidden));
      });

      // Close when clicking a link (mobile UX nicety)
      menu.addEventListener("click", (e) => {
        if (e.target.matches("a")) {
          menu.classList.add("hidden");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    // ---------- Testimonials Carousel ----------
    if (testimonialText && testimonialAuthor) {
      let current = 0;
      let timer;

      const setSlide = (i) => {
        current = i % testimonials.length;
        testimonialText.textContent = testimonials[current].text;
        testimonialAuthor.textContent = testimonials[current].author;
      };

      const start = () => {
        stop();
        timer = setInterval(() => setSlide(current + 1), 5000);
      };
      const stop = () => timer && clearInterval(timer);

      // Pause on hover for readability
      const box = $("#testimonial-box");
      if (box) {
        box.addEventListener("mouseenter", stop);
        box.addEventListener("mouseleave", start);
      }

      setSlide(0);
      start();
    }

    // Initial table render (if exists)
    renderBookings();
  });
})();
