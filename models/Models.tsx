export interface Searchable {
  getName(): string
}

export interface Shoppable extends Searchable {
  getPrice(): number
}

export class Product implements Searchable {
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
  getName(): string {
    return this.name;
  }
}

export class Article implements Shoppable {
  product: Product;
  quantity: number;
  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
  getName(): string {
    return this.product.name;
  }
  getPrice(): number {
    return this.product.price * this.quantity / this.product.quantity;
  }
}

export class Recipe implements Shoppable {
  id: number;
  name: string;
  ingredients: Article[];
  quantity: number;
  constructor(name: string, ingredients: Article[], quantity: number, id: number = -1) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.quantity = quantity;
  }
  getName(): string {
    return this.name;
  }
  getPrice(): number {
    return this.ingredients.map(i => i.getPrice()).reduce((a, b) => a + b);
  }
}

export class RecipeArticles implements Shoppable {
  recipe: Recipe;
  quantity: number;
  constructor(recipe: Recipe, quantity: number) {
    this.recipe = recipe;
    this.quantity = quantity;
  }
  getPrice(): number {
    return this.quantity * this.recipe.getPrice() / this.recipe.quantity;
  }
  getName(): string {
    return this.recipe.getName();
  }
}

export class ShoppingList {
  items: Shoppable[];
  constructor (items: Shoppable[]) {
    this.items = items;
  }
}

export class Shelf {
  name: string;
  products: Product[];
  constructor (name: string, products: Product[]) {
    this.name = name;
    this.products = products;
  }
}

export class Store {
  name: string;
  shelves: Shelf[];
  constructor (name: string, shelves: Shelf[]) {
    this.name = name;
    this.shelves = shelves;
  }
}