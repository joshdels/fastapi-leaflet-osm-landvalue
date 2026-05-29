/**
 * Sidebar toggler
 */
export function initSidebarControl(map) {
  const sidebarToggler = document.querySelector(".sidebar-toggler");
  const sidebar = document.querySelector("#sidebar");

  L.DomEvent.disableClickPropagation(sidebarToggler);
  L.DomEvent.disableScrollPropagation(sidebarToggler);

  let isOpen = false;

  sidebarToggler.addEventListener("click", (e) => {
    L.DomEvent.stopPropagation(e);
    isOpen = !isOpen;

    sidebar.classList.toggle("collapsed");

    if (isOpen) {
      sidebarToggler.innerHTML = `<i data-lucide="panel-left-close"></i>`;
    } else {
      sidebarToggler.innerHTML = `<i data-lucide="panel-right-close"></i>`;
    }

    lucide.createIcons();

    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  });
}
