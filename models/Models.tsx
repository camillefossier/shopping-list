export interface Searchable {
  getId(): number
  getName(): string
}

export interface Shoppable extends Searchable {
  getPrice(): number
  getQuantity(): number
}

export class Product implements Shoppable {
  id: number;
  name: string;
  price: number;
  quantity: number;
  constructor(name: string, price: number, quantity: number, id: number = -1) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
  getPrice(): number {
    return this.price;
  }
  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getQuantity(): number {
    return this.quantity;
  }
  mul(factor: number): Product {
    return new Product(this.name, this.price * factor, this.quantity * factor, this.id);
  }
}

export interface Listable {}

export abstract class ListItem<A extends Shoppable> implements Listable {
  item: A;
  quantity: number;
  constructor(item: A, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }
  getId(): number {
    return this.item.getId();
  }
  getName(): string {
    return this.item.getName();
  }
  getPrice(): number {
    return this.item.getPrice() * this.quantity / this.item.getQuantity();
  }
  abstract getArticles(): Array<Article>;
}

export class Article extends ListItem<Product> {
  getArticles(): Article[] {
    return [this];
  }
  mul(factor: number): Article {
    return new Article(this.item, this.quantity * factor);
  }
  add(other: Article | undefined): Article {
    if (other === undefined) {
      return this;
    }
    if (other.item.id !== this.item.id) {
      throw new Error(`Cannot sum different products ${this.item.getName} (id: ${this.item.id}) and ${other.item.getName} (id: ${other.item.id}).`);
    }
    return new Article(this.item, this.quantity + other.quantity);
  }
}

export class Recipe implements Shoppable {
  id: number;
  name: string;
  articles: Article[];
  quantity: number;
  constructor(name: string, articles: Article[], quantity: number, id: number = -1) {
    this.id = id;
    this.name = name;
    this.articles = articles;
    this.quantity = quantity;
  }
  getQuantity(): number {
    return this.quantity;
  }
  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getPrice(): number {
    return this.articles.map(i => i.getPrice()).reduce((a, b) => a + b);
  }
}

export class RecipeAsArticle extends ListItem<Recipe> {
  getArticles(): Article[] {
    return this.item.articles.map(a => a.mul(this.quantity / this.item.quantity));
  }
}

export class ShoppingList {
  items: ListItem<Shoppable>[];
  constructor(items: ListItem<Shoppable>[]) {
    this.items = items;
  }

  getArticles(): Article[] {
    function factorizeArticles(articles: Article[]): Article[] {
      let articlesMap = new Map<number, Article>();
      articles.forEach(a => {
        articlesMap.set(a.item.id, a.add(articlesMap.get(a.item.id)));
      });
      return Array.from(articlesMap.values());
    }
    return factorizeArticles([].concat.apply(this.items.map(i => i.getArticles())));
  }

  // This method could allow to see for an article, why we are buying it.
  recipesForArticles(): Map<number, Array<ListItem<Shoppable>>> {
    throw new Error("Not implemented")
  }
}

export class Shelf {
  name: string;
  products: Product[];
  constructor(name: string, products: Product[]) {
    this.name = name;
    this.products = products;
  }
}

export class Store {
  name: string;
  shelves: Shelf[];
  constructor(name: string, shelves: Shelf[]) {
    this.name = name;
    this.shelves = shelves;
  }
}