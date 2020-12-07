const setupScrollIntoViewMock = () => {
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = () => {};
  }
};

setupScrollIntoViewMock();
