import { apiClient } from "../utils/api";
import { MainLayout } from "../layouts/MainLayout";
import { Section } from "../components/Section";

export const renderCategoryDetail = async (router, match) => {
  const slug = match?.data?.slug;
  if (!slug) return;

  MainLayout(
    `
    <div class="flex items-center justify-center h-64">
        <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  `,
    router
  );

  try {
    const data = await apiClient.getCategoryDetail(slug, { subLimit: 12 });
    console.log("Category Detail Data:", data);
    const category = data.data || data;
    const title = category.title || category.name || "Category Detail";
    
    // Kiểm tra các phần, mục hoặc danh mục con
    const sections = category.sections || [];
    const items = category.items || category.subcategories || [];

    let contentBody = '';

    if (sections.length > 0) {
        contentBody = sections.map((section, index) => 
            section.items && section.items.length > 0 
            ? Section(section.title || "Untitled", section.items, `category-section-${index}`) 
            : ''
        ).join('');
    } else if (items.length > 0) {
        contentBody = Section(title, items, "category-detail-list");
    } else {
        contentBody = '<p class="text-gray-400">Chưa có nội dung cho mục này.</p>';
    }

    const content = `
      <div class="space-y-8 pb-10">
        <div class="flex items-end gap-4 mb-6">
            <h1 class="text-4xl font-bold">${title}</h1>
        </div>
        
        ${contentBody}
      </div>
    `;

    MainLayout(content, router);
  } catch (error) {
    console.error("Category detail error", error);
    MainLayout(
      `
      <div class="text-center py-20 text-red-500">
        <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
        <p>${error.message}</p>
        <button onclick="window.history.back()" class="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200">Quay lại</button>
      </div>
    `,
      router
    );
  }
};
