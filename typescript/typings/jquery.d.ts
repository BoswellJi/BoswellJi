declare namespace JQuery {
  interface selectors {
    css: string
  }
  function add(css: string): void;
}

export function jQuery(options: JQuery.selectors): JQuery.selectors;