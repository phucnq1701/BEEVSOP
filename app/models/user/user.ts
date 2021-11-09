import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types.model("User").props({
  SoThe: types.maybeNull(types.string),
  MaVach: types.maybeNull(types.string),
  NgayHH: types.maybeNull(types.string),
  MaKH: types.maybeNull(types.number),
  MaNVN: types.maybeNull(types.number),
  DiemThe: types.maybeNull(types.number),
  NgayNhap: types.maybeNull(types.string),
  MaTT: types.maybeNull(types.number),
  TenCTDK: types.maybeNull(types.string),
  NgaySinh: types.maybeNull(types.string),
  TenKH: types.maybeNull(types.string),
  DiDong: types.maybeNull(types.string),
  Email: types.maybeNull(types.string),
  SoCMND: types.maybeNull(types.string),
}) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
