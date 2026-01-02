import { authStore } from '../store/authStore';
import { uiStore } from '../store/uiStore';
import { apiClient } from '../utils/api';
import { escapeHTML } from "../utils/security";

const SEARCH_HISTORY_KEY = "yt_search_history";
const MAX_HISTORY_ITEMS = 5;

// Get search history from localStorage
const getSearchHistory = () => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

// Save search term to history
const saveToHistory = (term) => {
  if (!term || term.trim().length < 2) return;

  const history = getSearchHistory();
  // Remove if already exists
  const filtered = history.filter(
    (h) => h.toLowerCase() !== term.toLowerCase()
  );
  // Add to front
  filtered.unshift(term);
  // Keep only recent items
  const limited = filtered.slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(limited));
};

// Remove item from history
const removeFromHistory = (term) => {
  const history = getSearchHistory();
  const filtered = history.filter((h) => h !== term);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filtered));
};

// Clear all history
const clearAllHistory = () => {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
};

export const Header = () => {
  const user = authStore.user;
  const initial = user && user.name ? user.name.charAt(0).toUpperCase() : "G";

  return `
    <header class="sticky top-0 h-16 bg-transparent z-header flex items-center justify-between px-[113px] mb-4">
      <!-- Center: Search Bar -->
      <div class="flex items-center flex-1 max-w-xl">
        <div class="relative w-full group" id="search-container">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-yt-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
                id="search-input"
                type="text" 
                placeholder="Tìm kiếm bài hát, album, nghệ sĩ..." 
                class="block w-full p-2.5 pl-10 pr-10 text-sm text-yt-text-primary bg-white/10 border border-transparent rounded-lg focus:ring-white focus:border-white placeholder-gray-400 focus:bg-black"
                autocomplete="off"
            >
            <!-- Clear Button -->
            <button id="search-clear-btn" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors hidden">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <!-- Suggestions Dropdown -->
            <div id="search-suggestions" class="absolute left-0 right-0 top-full mt-2 bg-yt-player rounded-lg shadow-xl border border-gray-700 hidden overflow-hidden z-50 max-h-[70vh] overflow-y-auto search-dropdown"></div>
        </div>
      </div>

      <!-- Right Side Icons -->
      <div class="flex items-center gap-4">
          <!-- Cast Button -->
          <button class="p-2 text-yt-text-primary hover:bg-white/10 rounded-full transition-colors" title="Cast to device">
             <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.92-11-11-11z"/></svg>
          </button>

          <!-- User Profile -->
         ${
           user
             ? `
            <div id="profile-trigger" class="flex items-center gap-3 cursor-pointer relative select-none">
                <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    ${initial}
                </div>
                <!-- Dropdown -->
                <div id="profile-dropdown" class="absolute right-0 top-10 w-48 bg-yt-player rounded shadow-lg py-1 hidden border border-gray-700">
                     <div class="px-4 py-3 border-b border-gray-700">
                        <p class="text-sm text-white font-medium truncate">${user.name}</p>
                        <p class="text-xs text-gray-400 truncate">${user.email}</p>
                     </div>
                     <button id="header-logout-btn" class="block w-full text-left px-4 py-2 text-sm text-yt-text-primary hover:bg-gray-700">Đăng xuất</button>
                </div>
            </div>
         `
             : `
            <a href="${
              import.meta.env.BASE_URL
            }login" class="text-sm font-medium text-yt-text-primary px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors" data-navigo>Đăng nhập</a>
         `
         }
      </div>
    </header>
  `;
};

// Render search history section
const renderHistorySection = (history) => {
  if (history.length === 0) return "";

  return `
    <div class="search-section">
      ${history
        .map(
          (term) => `
        <div class="search-suggestion-item history-item flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 cursor-pointer group" data-suggestion="${escapeHTML(
          term
        )}">
          <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="flex-1 text-sm text-white truncate">${escapeHTML(
            term
          )}</span>
          <button class="delete-history-btn opacity-0 group-hover:opacity-100 p-1 hover:bg-white/20 rounded transition-opacity" data-term="${escapeHTML(
            term
          )}" title="Xóa">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

// Render text suggestions section
const renderSuggestionsSection = (suggestions) => {
  if (!suggestions || suggestions.length === 0) return "";

  return `
    <div class="search-section">
      ${suggestions
        .map(
          (text) => `
        <div class="search-suggestion-item flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 cursor-pointer" data-suggestion="${escapeHTML(
          text
        )}">
          <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span class="flex-1 text-sm text-white truncate">${escapeHTML(
            text
          )}</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

// Render completed items (albums, videos, songs with thumbnails)
const renderCompletedSection = (items) => {
  if (!items || items.length === 0) return "";

  return `
    <div class="search-section border-t border-gray-700">
      ${items
        .map((item) => {
          const thumbnail =
            (item.thumbnails && item.thumbnails[0]) ||
            item.thumbnail ||
            "https://via.placeholder.com/60";
          const title = escapeHTML(item.title || item.name || "Untitled");
          const subtitle = escapeHTML(item.subtitle || item.type || "");
          const typeLabel =
            item.type === "album"
              ? "Album"
              : item.type === "video"
              ? "Video"
              : item.type === "song"
              ? "Bài hát"
              : item.type === "artist"
              ? "Nghệ sĩ"
              : "";
          const isRounded = item.type === "artist";

          return `
          <div class="search-completed-item flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 cursor-pointer" 
               data-type="${item.type}" 
               data-id="${item.id}" 
               data-slug="${item.slug || ""}"
               data-item='${JSON.stringify(item).replace(/'/g, "&#39;")}'>
            <div class="w-12 h-12 flex-shrink-0 ${
              isRounded ? "rounded-full" : "rounded"
            } overflow-hidden bg-gray-800">
              <img src="${thumbnail}" alt="${title}" class="w-full h-full object-cover" loading="lazy">
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-white font-medium truncate">${title}</p>
              <p class="text-xs text-gray-400 truncate">${typeLabel}${
            subtitle ? " • " + subtitle : ""
          }</p>
            </div>
          </div>
        `;
        })
        .join("")}
    </div>
  `;
};

// Gắn sự kiện sau khi render
export const setupHeaderEvents = (router) => {
  // Toggle Sidebar
  const toggleBtn = document.getElementById("sidebar-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      uiStore.toggleSidebar();
    });
  }

  // Search Logic
  const searchInput = document.getElementById("search-input");
  const suggestionsBox = document.getElementById("search-suggestions");
  const clearBtn = document.getElementById("search-clear-btn");
  let debounceTimeout;
  let currentQuery = "";

  if (searchInput && suggestionsBox) {
    // Show/hide clear button
    const updateClearButton = () => {
      if (clearBtn) {
        if (searchInput.value.trim().length > 0) {
          clearBtn.classList.remove("hidden");
        } else {
          clearBtn.classList.add("hidden");
        }
      }
    };

    // Clear button click
    if (clearBtn) {
      clearBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        searchInput.value = "";
        updateClearButton();
        searchInput.focus();
        showInitialSuggestions();
      });
    }

    // Show initial suggestions (history only)
    const showInitialSuggestions = () => {
      const history = getSearchHistory();
      if (history.length > 0) {
        suggestionsBox.innerHTML = renderHistorySection(history);
        suggestionsBox.classList.remove("hidden");
      } else {
        suggestionsBox.classList.add("hidden");
      }
    };

    // Handle Input
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      currentQuery = query;
      updateClearButton();
      clearTimeout(debounceTimeout);

      if (query.length < 2) {
        showInitialSuggestions();
        return;
      }

      debounceTimeout = setTimeout(async () => {
        try {
          const res = await apiClient.getSearchSuggestions(query);
          const data = res || {};

          // API returns { suggestions: [...], completed: [...] }
          const suggestions = data.suggestions || [];
          const completed = data.completed || [];
          const history = getSearchHistory().filter((h) =>
            h.toLowerCase().includes(query.toLowerCase())
          );

          let html = "";

          // History matches
          if (history.length > 0) {
            html += renderHistorySection(history);
          }

          // Text suggestions
          if (suggestions.length > 0) {
            html += renderSuggestionsSection(suggestions);
          }

          // Completed items (albums, videos, songs)
          if (completed.length > 0) {
            html += renderCompletedSection(completed);
          }

          if (html) {
            suggestionsBox.innerHTML = html;
            suggestionsBox.classList.remove("hidden");
          } else {
            suggestionsBox.classList.add("hidden");
          }
        } catch (err) {
          console.error("Suggestion error", err);
        }
      }, 300);
    });

    // Handle Focus
    searchInput.addEventListener("focus", () => {
      updateClearButton();
      const query = searchInput.value.trim();
      if (query.length < 2) {
        showInitialSuggestions();
      } else if (suggestionsBox.innerHTML.trim()) {
        suggestionsBox.classList.remove("hidden");
      }
    });

    // Handle Enter Key
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const term = searchInput.value.trim();
        if (term) {
          router.navigate(`search?q=${encodeURIComponent(term)}`);
          window.dispatchEvent(
            new CustomEvent("search-change", { detail: { query: term } })
          );

          suggestionsBox.classList.add("hidden");
          searchInput.blur();
        }
      } else if (e.key === "Escape") {
        suggestionsBox.classList.add("hidden");
        searchInput.blur();
      }
    });

    // Handle suggestion clicks
    suggestionsBox.addEventListener("click", (e) => {
      // Delete history button
      const deleteBtn = e.target.closest(".delete-history-btn");
      if (deleteBtn) {
        e.stopPropagation();
        const term = deleteBtn.dataset.term;
        removeFromHistory(term);
        // Refresh suggestions
        const parentItem = deleteBtn.closest(".history-item");
        if (parentItem) {
          parentItem.remove();
        }
        // If no more history items, hide or refresh
        const remainingHistory =
          suggestionsBox.querySelectorAll(".history-item");
        if (remainingHistory.length === 0) {
          const query = searchInput.value.trim();
          if (query.length < 2) {
            suggestionsBox.classList.add("hidden");
          }
        }
        return;
      }

      // Completed item click (navigate directly)
      const completedItem = e.target.closest(".search-completed-item");
      if (completedItem) {
        const type = completedItem.dataset.type;
        const id = completedItem.dataset.id;
        const itemData = JSON.parse(completedItem.dataset.item || "{}");

        suggestionsBox.classList.add("hidden");

        if (type === "song" || type === "video") {
          import("../store/playerStore").then(({ playerStore }) => {
            playerStore.play(itemData);
          });
        } else if (type === "album") {
          router.navigate(`album/${id}`);
        } else if (type === "playlist") {
          router.navigate(`playlist/${id}`);
        } else if (type === "artist") {
          router.navigate(`artist/${id}`);
        }
        return;
      }

      // Text suggestion click
      const suggestionItem = e.target.closest("[data-suggestion]");
      if (suggestionItem) {
        const term = suggestionItem.dataset.suggestion;
        searchInput.value = term;
        router.navigate(`search?q=${encodeURIComponent(term)}`);
        window.dispatchEvent(
          new CustomEvent("search-change", { detail: { query: term } })
        );

        suggestionsBox.classList.add("hidden");
      }
    });

    // Close when clicking outside
    const closeSearch = (e) => {
      const searchContainer = document.getElementById("search-container");
      if (searchContainer && !searchContainer.contains(e.target)) {
        suggestionsBox.classList.add("hidden");
      }
    };
    document.addEventListener("click", closeSearch);
  }

  // Logout Logic
  const logoutBtn = document.getElementById("header-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      // Đóng dropdown đề phòng
      const dropdown = document.getElementById("profile-dropdown");
      if (dropdown) dropdown.classList.add("hidden");

      await authStore.logout();
      router.navigate("login");
    });
  }

  // Toggle Profile Dropdown
  const trigger = document.getElementById("profile-trigger");
  const dropdown = document.getElementById("profile-dropdown");

  if (trigger && dropdown) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });

    const closeDropdown = (e) => {
      if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    };

    // Gỡ bỏ cái cũ để tránh trùng lặp
    if (document._headerClickOutside) {
      document.removeEventListener("click", document._headerClickOutside);
    }
    document._headerClickOutside = closeDropdown;
    document.addEventListener("click", closeDropdown);
  }
};
