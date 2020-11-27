export const menageServices = () => {
  const servicesMenu = document.querySelectorAll(".index-preview__menu-item");
  servicesMenu.forEach((item) => {
    item.addEventListener("click", (event) => {
      clearActiveItems();
      const currentItem = event.currentTarget;
      const type = currentItem.dataset.type;
      currentItem.classList.add("index-preview__menu-item--active");
      clearActiveContents();
      document
        .querySelector(`[data-type='${type}'].index-preview__content-item`)
        .classList.remove("display-none");
      console.log(`data[type='${type}'].index-preview__content-item`);
    });
  });
};

const clearActiveItems = () => {
  const servicesMenu = document.querySelectorAll(".index-preview__menu-item");
  servicesMenu.forEach((item) => {
    item.classList.remove("index-preview__menu-item--active");
  });
};

const clearActiveContents = () => {
  const servicesMenu = document.querySelectorAll(
    ".index-preview__content-item"
  );
  servicesMenu.forEach((item) => {
    item.classList.add("display-none");
  });
};
