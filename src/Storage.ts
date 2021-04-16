import { Eventable } from './Eventable';

type StorageMap = Map<Symbol, Eventable> | null;

export class Storage {
  private _id: number = 0;
  private _storage: StorageMap = null;
  private static _Instance: Storage | null;

  private constructor() {
    this._createStorage();
  }

  public static getInstance() {
    if(!Storage._Instance) {
      Storage._Instance = new Storage();
    }
    return Storage._Instance;
  }

  public push(obj: Eventable): void {
    if(this._storage) {
      this._id++;
      this._storage.set(Symbol(this._id), obj);
    }
  }

  public getExistingStorageMap(): Map<Symbol, Eventable> {
    if(!this._storage) {
      throw new Error('No storage. Create Eventable first');
    }

    return this._storage as Map<Symbol, Eventable>;
  }

  private _createStorage() {
    this._storage = new Map<Symbol, Eventable>();
    Storage._Instance = this;
  }
}