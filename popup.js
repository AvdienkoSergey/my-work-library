function ConstructorFactory(prototype) {
  function _Constructor(property) {
    for (let key in property) {
      this[key] = property[key];
    }
  }
  Object.setPrototypeOf(_Constructor.prototype, prototype);
  return _Constructor;
}

const TabsConstructor = ConstructorFactory({
  onClick: function (name = "") {
    if (!name) {
      name = this.items[0].name;
    }
    this.items = this.items.map((item) => {
      item.isActive = item.name === name;
      return item;
    });
    this.render();
  },
  render: function () {
    var tabs = document.getElementById("tabs-list");
    tabs.innerHTML = "";

    for (let i = 0; i < this.items.length; i++) {
      var tabsItem = this.items[i];

      var tab = document.createElement("li");
      var tab_a = document.createElement("a");
      var tab_a_span = document.createElement("span");
      var tab_a_span_i = document.createElement("i");
      var tab_a_span_2 = document.createElement("span");

      tab_a_span.classList.add(["icon", "is-small"]);
      tab_a_span_i.setAttribute("aria-hidden", true);

      tab_a_span.append(tab_a_span_i);
      tab_a.append(tab_a_span);
      tab_a.append(tab_a_span_2);
      tab.append(tab_a);

      tabsItem.isActive
        ? tab.classList.add("is-active")
        : tab.classList.remove("is-active");

      tabsItem.isActive
        ? tab_a_span_i.classList.add(["fas", "fa-folder-open"])
        : tab_a_span_i.classList.add(["fas", "fa-folder"]);

      tab_a_span_2.innerText = tabsItem.name;

      tab.addEventListener('click', (e) => {
        this.onClick(e.target.innerText)
      });

      tabs.append(tab);
    }
  },
});

const SearchConstructor = ConstructorFactory({
  onInput: function () {
    throw Error("Not implements");
  },
});

const MenuConstructor = ConstructorFactory({
  onClick: function (name = "") {
    if (!name) {
      name = this.tabs[0].name;
    }
    this.items = this.tabs.map((tab) => {
      tab.isActive = tab.name === name;
      return tab;
    });
    this.render();
  },
  render: function () {
    var menu = document.getElementById("menu");
    menu.innerHTML = "";


  }
});

var Tabs = new TabsConstructor({
  items: [
    { name: "Заготовки", folder: "blanks", isActive: false },
    { name: "Выручалки", folder: "revenue", isActive: false },
    { name: "Развивашки", folder: "educational", isActive: false },
    { name: "Размышлялки", folder: "reflections", isActive: false },
  ],
  folder: "",
});

var Menu = new MenuConstructor({
  items: [{
    label: "Проекты",
    items: [
      { name: "Javascript", isActive: false },
      { name: "CSS", isActive: false },
    ] 
  }]
})

Tabs.onClick();
// Menu.onClick();