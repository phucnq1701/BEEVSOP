import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const WithdrawModel = types.model("Withdraw").props({
  Tien: types.maybeNull(types.number),
  GhiChu: types.maybeNull(types.string),
  NgayNhap: types.maybeNull(types.string),
  TenGD: types.maybeNull(types.string),
  TongTien: types.maybeNull(types.number),
  DiemTru: types.maybeNull(types.number),
  TienTru: types.maybeNull(types.number),
  Diem: types.maybeNull(types.number),
})

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type WithdrawType = Instance<typeof WithdrawModel>
export interface Withdraw extends WithdrawType {}
type WithdrawSnapshotType = SnapshotOut<typeof WithdrawModel>
export interface WithdrawSnapshot extends WithdrawSnapshotType {}
export const createWithdrawDefaultModel = () => types.optional(WithdrawModel, {})
