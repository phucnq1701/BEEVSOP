import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const RequestStatusModel = types
  .model("RequestStatus")
  .props({
    MaTT: types.maybeNull(types.number),
    TenTT: types.maybeNull(types.string),
    MauNen: types.maybeNull(types.string),
    isViewApp: types.maybeNull(types.boolean),
    MaTN: types.maybeNull(types.number),
    MaCTDK: types.maybeNull(types.number),
    isNgayHoanThanh: types.maybeNull(types.boolean),
    ViewAppCuDan: types.maybeNull(types.boolean),
    DefaultCuDan: types.maybeNull(types.boolean),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type RequestStatusType = Instance<typeof RequestStatusModel>
export interface RequestStatus extends RequestStatusType {}
type RequestStatusSnapshotType = SnapshotOut<typeof RequestStatusModel>
export interface RequestStatusSnapshot extends RequestStatusSnapshotType {}
export const createRequestStatusDefaultModel = () => types.optional(RequestStatusModel, {})
