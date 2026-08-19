(function () {
  "use strict";

  // ===== 1. DATA KONSTANTA APLIKASI =====
  const APP_LIST = [
    {
      title: "Monitoring",
      subtitle: "Dasboard monitoring kedisiplinan siswa",
      url: "https://script.google.com/macros/s/AKfycbwo_yfnmhrCmYe2qzdcQcpNMq3dYrWXauxft9Ob6KGQIInvTKbl-Bsapx5XqH8lE4PVDA/exec",
      icon: "fas fa-house-laptop",
      theme: {
        bg: "bg-indigo-100 dark:bg-indigo-900/50",
        text: "text-indigo-600 dark:text-indigo-300",
        hover: "group-hover:text-indigo-500 dark:group-hover:text-indigo-400",
      },
    },
    {
      title: "Aplikasi KBM",
      subtitle: "Aplikasi penginputan absensi siswa oleh wali kelas",
      url: "https://script.google.com/macros/s/AKfycbxnc_s48AmrvH7uTWN8FwuBwTcogLvP2GAGi8UIx9LIb-0ZLhdscd-YvQ89v7ivpWliNg/exec",
      icon: "fas fa-graduation-cap",
      theme: {
        bg: "bg-rose-100 dark:bg-rose-900/40",
        text: "text-rose-600 dark:text-rose-300",
        hover: "group-hover:text-rose-500 dark:group-hover:text-rose-400",
      },
    },
    {
      title: "Aplikasi Jama'ah",
      subtitle: "Aplikasi penginputan absensi sholat jama'ah",
      url: "https://script.google.com/macros/s/AKfycbw1k5FfFkuMVXSNG1i9mW_IC811hJkkItLP5gec6VWK4iX_aaoxBL2dKCItYbarmAGeTg/exec",
      icon: "fas fa-mosque",
      theme: {
        bg: "bg-emerald-100 dark:bg-emerald-900/40",
        text: "text-emerald-600 dark:text-emerald-300",
        hover: "group-hover:text-emerald-500 dark:group-hover:text-emerald-400",
      },
    },
    {
      title: "Aplikasi PKB",
      subtitle: "Aplikasi penginputan absensi PKB",
      url: "https://script.google.com/macros/s/AKfycbxcGbwfYIOYzKaGDCN_RmK0zA2aQwbq3vyswAh-jpfAl63qjD2rwVHDw7ybZvuVuIbqfA/exec",
      icon: "fas fa-user-graduate",
      theme: {
        bg: "bg-amber-100 dark:bg-amber-900/40",
        text: "text-amber-600 dark:text-amber-300",
        hover: "group-hover:text-amber-500 dark:group-hover:text-amber-400",
      },
    },
    {
      title: "Aplikasi Ekstrakurikuler",
      subtitle: "Aplikasi penginputan Ekstakurikuler",
      url: "https://script.google.com/macros/s/AKfycbwhWnwVLRmBLRCD4DFgBLmAwHuC8MU-xV5McweFbnyIYBK73jfZWBg24FhN_wM1Ekua/exec",
      icon: "fas fa-users",
      theme: {
        bg: "bg-cyan-100 dark:bg-cyan-900/40",
        text: "text-cyan-600 dark:text-cyan-300",
        hover: "group-hover:text-cyan-500 dark:group-hover:text-cyan-400",
      },
    },
  ];

  // ===== 2. RENDER LIST APLIKASI KE HTML =====
  const appListContainer = document.getElementById("appList");

  if (appListContainer) {
    let htmlContent = "";

    APP_LIST.forEach((app) => {
      // PERUBAHAN: Menambahkan target="_blank" dan rel="noopener noreferrer" pada tag <a>
      htmlContent += `
        <a
          href="${app.url}"
          target="_blank" 
          rel="noopener noreferrer"
          class="app-link card-hover flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-200/70 dark:border-gray-600/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
        >
          <div
            class="w-10 h-10 rounded-xl ${app.theme.bg} flex items-center justify-center ${app.theme.text} text-lg group-hover:scale-105 transition-transform"
          >
            <i class="${app.icon}"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-gray-800 dark:text-white text-sm md:text-base">
              ${app.title}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 truncate">
              ${app.subtitle}
            </div>
          </div>
          <i
            class="fas fa-chevron-right text-gray-400 dark:text-gray-500 ${app.theme.hover} text-sm"
          ></i>
        </a>
      `;
    });

    appListContainer.innerHTML = htmlContent;
  }

  // ===== 3. ELEMEN DARK MODE =====
  const toggleBtn = document.getElementById("darkModeToggle");
  const darkIcon = document.getElementById("darkIcon");
  const storedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  let isDark = false;

  function setTheme(dark) {
    if (dark) {
      document.documentElement.classList.add("dark");
      isDark = true;
      localStorage.setItem("theme", "dark");
      darkIcon.className = "fas fa-sun";
    } else {
      document.documentElement.classList.remove("dark");
      isDark = false;
      localStorage.setItem("theme", "light");
      darkIcon.className = "fas fa-moon";
    }
  }

  // Inisialisasi Tema
  if (storedTheme === "dark") {
    setTheme(true);
  } else if (storedTheme === "light") {
    setTheme(false);
  } else {
    setTheme(systemPrefersDark);
  }

  // Event Toggle Dark Mode
  toggleBtn.addEventListener("click", function (e) {
    e.preventDefault();
    setTheme(!isDark);
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches);
      }
    });

  // ===== 4. INTERAKSI LINK (Efek Kilat tanpa memblokir klik) =====
  // PERUBAHAN: Memilih class '.app-link' dan MENGHAPUS ev.preventDefault()
  const links = document.querySelectorAll(".app-link");
  links.forEach((link) => {
    link.addEventListener("click", function () {
      // efek kilat
      this.style.transition = "background 0.1s";
      this.style.background = "rgba(99, 102, 241, 0.15)";
      setTimeout(() => {
        this.style.background = "";
      }, 150);

      const appTitle = this.querySelector(".font-semibold").innerText.trim();
      console.log("🔗 Membuka Tab Baru: " + appTitle);
    });
  });

  // ===== 5. UPDATE WAKTU STATUS SECARA OTOMATIS =====
  const statusTime = document.querySelector(
    ".text-gray-500.dark\\:text-gray-400.hidden.sm\\:inline",
  );
  if (statusTime) {
    const now = new Date();
    const jam = now.getHours().toString().padStart(2, "0");
    const menit = now.getMinutes().toString().padStart(2, "0");
    statusTime.textContent = `updated ${jam}:${menit}`;
  }

  console.log(
    "✅ Beranda aplikasi siap — list dirender, link buka tab baru, dark mode berfungsi.",
  );
})();
