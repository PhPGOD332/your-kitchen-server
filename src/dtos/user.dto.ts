import type { IUser } from "../types/IUser";

export default class UserDto {
  email: string;
  _id: string;
  isActivated: boolean;
  activationLink?: string;
  role: {
    value: string;
    label: string;
  };

  constructor (model: IUser | any) {
    this.email = model.email;
    this._id = model._id;
    this.isActivated = model.isActivated;
    this.activationLink = model.activationLink || undefined;
    this.role = model.role;
  }
}