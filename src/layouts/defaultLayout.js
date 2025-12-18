import header from "../components/header";
import sidebar from "../components/sidebar";

export default function defaultLayout() {
  return `
<div class="flex h-dvh">
  ${sidebar()}
  <div>
    ${header()}
    <div class="pt-16">
      <main id="main-content">
        <!-- Main content will be rendered here -->
      </main>
    </div>
  </div>
</div>
  `;
}
