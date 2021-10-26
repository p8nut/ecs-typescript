export class Tag {
    tags: string[];
    constructor(...tags: string[]) {
      this.tags = [...tags];
    }
  
    add(tag: string) {
      this.tags.push(tag);
      return this;
    }
    remove(tag: string) {
      this.tags = this.tags.filter((t) => t !== tag);
      return this;
    }
  
    has(tag: string) {
      return this.tags.includes(tag);
    }
  }
  