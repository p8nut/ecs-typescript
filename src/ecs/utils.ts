export type Constructor<T = any> = { new (...args: any[]): T };
//export type Constructor<T extends {} = {}> = new (...args: any[]) => T;
export type InstancesTypes<Constructors extends Constructor[]> = { [Key in keyof Constructors]: Constructors[Key] extends Constructor ? InstanceType<Constructors[Key]> : never; } 
