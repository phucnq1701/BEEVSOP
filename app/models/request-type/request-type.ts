import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const RequestTypeModel = types
  .model("RequestType")
  .props({
    MaLYC: types.maybeNull(types.number),
    TenLYC: types.maybeNull(types.string),
    IsViewApCuDan: types.maybeNull(types.boolean),
    MaPB: types.maybeNull(types.number),
    MaTN: types.maybeNull(types.number),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type RequestTypeType = Instance<typeof RequestTypeModel>
export interface RequestType extends RequestTypeType {}
type RequestTypeSnapshotType = SnapshotOut<typeof RequestTypeModel>
export interface RequestTypeSnapshot extends RequestTypeSnapshotType {}
export const createRequestTypeDefaultModel = () => types.optional(RequestTypeModel, {})
