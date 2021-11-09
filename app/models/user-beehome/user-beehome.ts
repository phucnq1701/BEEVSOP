import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
const Apartment = types.model("Apartment").props({
  MaSoMB: types.maybeNull(types.string),
  SoNha: types.maybeNull(types.string),
  DienTich: types.maybeNull(types.number),
  MaTN: types.maybeNull(types.number),
})
const User = types.model("UserBeehome").props({
  TenKH: types.maybeNull(types.string),
  NgaySinh: types.maybeNull(types.string),
  DienThoaiKH: types.maybeNull(types.string),
  EmailKH: types.maybeNull(types.string),
  DCTT: types.maybeNull(types.string),
  DCLL: types.maybeNull(types.string),
})
export const UserBeehomeModel = types
  .model("UserBeehome")
  .props({
    TenTN: types.maybeNull(types.string),
    TenVT: types.maybeNull(types.string),
    MaCode: types.maybeNull(types.string),
    Logo: types.maybeNull(types.string),
    Mobile: types.maybeNull(types.string),
    MaKhu: types.maybeNull(types.number),
    MaMB: types.maybeNull(types.number),
    MaTang: types.maybeNull(types.number),
    Status: types.maybeNull(types.number),
    DatabaseID: types.maybeNull(types.number),
    Apartment: types.maybeNull(Apartment),
    User: types.maybeNull(User),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type UserBeehomeType = Instance<typeof UserBeehomeModel>
export interface UserBeehome extends UserBeehomeType {}
type UserBeehomeSnapshotType = SnapshotOut<typeof UserBeehomeModel>
export interface UserBeehomeSnapshot extends UserBeehomeSnapshotType {}
export const createUserBeehomeDefaultModel = () => types.optional(UserBeehomeModel, {})
