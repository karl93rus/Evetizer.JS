import { Storage } from './Storage';

export class Eventable {
  private _evt: string;
  private _triggerEvt: string;
  private _triggerFn: Function | undefined;
  private _triggerFnData: any | undefined;

  constructor(obj: any) {
    this._evt = '';
    this._triggerEvt = '';
    this._triggerFn = undefined;

    this._populateStorage();
  }

  public dispatchEvent(evt: string, data?: any) {
    this._evt = evt;
    for(const obj of Storage.getInstance().getExistingStorageMap().values()) {
      if((obj as Eventable)._triggerEvt === this._evt) {
        if(data) {
          (obj as Eventable).callTriggerFn(data);
        } else {
          (obj as Eventable).callTriggerFn();
        }
      }
    }
  }

  public on(evt: string, cb: (data?: any) => any) {
    this._triggerEvt = evt;
    this._triggerFn = cb;
  }

  private _populateStorage() {
    Storage.getInstance().push(this as Eventable);
  }

  private callTriggerFn(data?: any) {
    if(this._triggerFn) {
      if(this._triggerFn && data) {
        this._triggerFn(data);
      } else if(this._triggerFn && !data) {
        this._triggerFn();
      }
    }
  }
}