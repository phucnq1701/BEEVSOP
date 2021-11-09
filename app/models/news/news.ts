import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const NewsModel = types
  .model("News")
  .props({
    ID:types.maybeNull(types.number),
    TieuDe:types.maybeNull(types.string),
    MaDA:types.maybeNull(types.number),
    IsBanner:types.maybeNull(types.boolean),
    NgayNhap:types.maybeNull(types.string),
    imgIcon:types.maybeNull(types.string),
  })

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type NewsType = Instance<typeof NewsModel>
export interface News extends NewsType {}
type NewsSnapshotType = SnapshotOut<typeof NewsModel>
export interface NewsSnapshot extends NewsSnapshotType {}
export const createNewsDefaultModel = () => types.optional(NewsModel, {})
