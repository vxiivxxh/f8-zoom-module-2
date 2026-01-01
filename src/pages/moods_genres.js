import { apiClient } from "../utils/api";
import { MainLayout } from "../layouts/MainLayout";
import { MoodGrid } from "../components/Moods";

export const renderMoodsGenres = async (router) => {
  MainLayout(
    `
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,
    router
  );

  try {
    const [categoriesRes, linesRes] = await Promise.all([
      apiClient.getCategories(),
      apiClient.getLines({ limit: 20 }),
    ]);

    const categories = categoriesRes?.items || categoriesRes?.data || [];
    const lines = linesRes?.items || linesRes?.data || [];

    const content = `
       <div class="space-y-12">
         <section>
             <h2 class="text-2xl font-bold mb-4">Tâm trạng và khoảnh khắc</h2>
             ${MoodGrid(categories)}
         </section>

         <section>
             <h2 class="text-2xl font-bold mb-4">Dòng nhạc</h2>
             ${MoodGrid(lines)}
         </section>
       </div>
    `;

    MainLayout(content, router);
  } catch (error) {
    console.error("Moods & Genres load error", error);
    MainLayout(
      `
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${error.message}</p>
       </div>
    `,
      router
    );
  }
};
