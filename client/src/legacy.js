/* ================================
   City Boy Petz — script.js
   ================================ */
(() => {
  // ---------- Config ----------
  // NEW/UPDATED: Point this to your deployed API when ready.
  // Example: "https://cityboypetz-api.onrender.com/api"
  const API_BASE = ""; // keep empty for localStorage mode

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

  // simple key for duplicate detection (date+time)
  const slotKey = (date, time) => `${date}T${time}`;

  // ---------- DOM Ready ----------
  document.addEventListener("DOMContentLoaded", () => {
    const form = $("#booking-form");
    const confirmation = $("#confirmation");

    // Optional admin table (guarded)
    const bookingsTable = $("#bookings-table");
    const tbody = bookingsTable ? $("#bookings-table tbody") : null;

    // Optional action buttons (guarded)
    const clearBtn = $("#clear-bookings");
    const exportBtn = $("#export-bookings");

    // Mobile menu (NOTE: ids must match your HTML)
    const menuToggle = $("#menu-toggle");
    const menu = $("#mobile-menu"); // <nav id="mobile-menu" class="mobile-menu">

    // Testimonials
    const testimonialText = $("#testimonial-text");
    const testimonialAuthor = $("#testimonial-author");
    const testimonials = [
      { text: "“City Boy Petz made my son’s birthday unforgettable!”", author: "– Sarah J." },
      { text: "“A fun and safe way to teach kids about animals.”", author: "– Coach Terrence" },
      { text: "“Incredible presentation and animal variety!”", author: "– Principal Monroe" },
    ];

    // prevent past dates
    const dateInput = $("#date");
    if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);

    // ---------- Form Validation ----------
    const validators = {
      name: (v) => v.trim().length >= 2 || "Please enter your full name.",
      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email.",
      date: (v) => {
        if (!v) return "Please select a date.";
        const today = new Date();
        const chosen = new Date(v + "T00:00:00");
        if (chosen.setHours(0, 0, 0, 0) < new Date(today.setHours(0, 0, 0, 0)))
          return "Please choose today or a future date.";
        return true;
      },
      time: (v) => !!v || "Please select a time.",
      reason: (v) => v.trim().length >= 5 || "Please add a brief reason (5+ characters).",
    };

    const setFieldError = (input, message) => {
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
        const rule = validators[id];
        const result = rule ? rule(el.value || "") : true;
        setFieldError(el, result === true ? "" : result);
      });
    });

    // ---------- Bookings Rendering ----------
    const escapeHTML = (str) =>
      String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const renderBookings = () => {
      if (!tbody) return;
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
          <td><button type="button" class="btn btn-small" data-index="${idx}" aria-label="Delete booking ${idx + 1}">Delete</button></td>
        `;
        tbody.appendChild(row);
      });
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

    // ---------- API helpers ----------
    const apiAvailable = Boolean(API_BASE);
    const postBooking = async (payload) => {
      if (!apiAvailable) return { ok: false, reason: "no_api" };
      try {
        const res = await fetch(`${API_BASE}/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          let errText = "Request failed.";
          try {
            const data = await res.json();
            errText = data?.message || data?.error || errText;
          } catch {}
          return { ok: false, reason: "http", status: res.status, message: errText };
        }
        const data = await res.json().catch(() => ({}));
        return { ok: true, data };
      } catch (e) {
        return { ok: false, reason: "network", message: e?.message || "Network error" };
      }
    };

    // ---------- Form Submit ----------
    if (form) {
      const submitBtn = form.querySelector('button[type="submit"]');

      const setSubmitting = (on) => {
        if (!submitBtn) return;
        submitBtn.disabled = on;
        submitBtn.textContent = on ? "Submitting..." : "Submit";
      };

      form.addEventListener("submit", async (e) => {
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

        const key = slotKey(booking.date, booking.time);
        const existing = readBookings();
        if (existing.some((b) => slotKey(b.date, b.time) === key)) {
          alert("That date & time is already requested. Please choose another slot.");
          return;
        }

        setSubmitting(true);

        let usedAPI = false;
        if (apiAvailable) {
          const res = await postBooking(booking);
          usedAPI = true;
          if (!res.ok) {
            if (res.status === 409) {
              setSubmitting(false);
              alert("That date & time is already booked. Please choose another slot.");
              return;
            }
            console.warn("API error, falling back to local save:", res);
            usedAPI = false;
          }
        }

        const list = readBookings();
        list.push(booking);
        writeBookings(list);

        const nice = formatDateTime(booking.date, booking.time);
        if (confirmation) {
          confirmation.textContent = usedAPI
            ? `Thanks, ${booking.name}! Your request for ${nice} has been received. We’ll confirm by email.`
            : `Thanks, ${booking.name}! Your request for ${nice} has been saved locally (offline mode). We’ll reach out by email.`;
          confirmation.classList.remove("hidden");
          confirmation.setAttribute("role", "status");
        }

        form.reset();
        renderBookings();

        if (confirmation) {
          const y = confirmation.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: "smooth" });
        }

        setSubmitting(false);
      });
    }

    // ---------- Export & Clear ----------
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

    // ---------- Mobile Menu (updated for .mobile-menu.open) ----------
    if (menuToggle && menu) {
      menuToggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open"); // .mobile-menu.open
        menuToggle.setAttribute("aria-expanded", String(isOpen));
      });

      // close when a link is tapped
      menu.addEventListener("click", (e) => {
        if (e.target.matches("a")) {
          menu.classList.remove("open");
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
