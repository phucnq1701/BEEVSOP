import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BeehomeNotiModel = types
  .model("BeehomeNoti")
  .props({
    MaTB: types.maybeNull(types.number),
    NgayNhap: types.maybeNull(types.string),
    TieuDe: types.maybeNull(types.string),
    img: types.maybeNull(types.string),
    isBanner: types.maybeNull(types.boolean),
    isHot: types.maybeNull(types.boolean),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type BeehomeNotiType = Instance<typeof BeehomeNotiModel>
export interface BeehomeNoti extends BeehomeNotiType {}
type BeehomeNotiSnapshotType = SnapshotOut<typeof BeehomeNotiModel>
export interface BeehomeNotiSnapshot extends BeehomeNotiSnapshotType {}
export const createBeehomeNotiDefaultModel = () => types.optional(BeehomeNotiModel, {})
