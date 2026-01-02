import { Card } from "./Card";

export const Section = (title, items, id, type) => {
  return `
      <section class="mb-10">
          <div class="flex items-end justify-between mb-4">
              <h2 class="text-2xl font-bold leading-tight">${title}</h2>
              ${
                items.length > 5
                  ? `
                 <div class="flex items-center gap-2">
                    <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white" 
                        data-scroll="left" data-target="${id}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white" 
                        data-scroll="right" data-target="${id}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                 </div>
              `
                  : ""
              }
          </div>
          <div id="${id}" class="flex overflow-x-auto gap-6 pb-4 scrollbar-styled scroll-smooth snap-x">
              ${items.map((item) => Card(item, { type })).join("")}
          </div>
      </section>
    `;
};
