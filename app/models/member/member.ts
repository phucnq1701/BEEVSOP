import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const MemberModel = types
  .model("Member")
  .props({
    ID: types.maybeNull(types.number),
    NgayDK: types.maybeNull(types.string),
    HoTenNK: types.maybeNull(types.string),
    NgaySinh: types.maybeNull(types.string),
    DienThoai: types.maybeNull(types.string),
    GioiTinh: types.maybeNull(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type MemberType = Instance<typeof MemberModel>
export interface Member extends MemberType {}
type MemberSnapshotType = SnapshotOut<typeof MemberModel>
export interface MemberSnapshot extends MemberSnapshotType {}
export const createMemberDefaultModel = () => types.optional(MemberModel, {})
