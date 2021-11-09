import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const InfoModel = types
  .model("Info")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type InfoType = Instance<typeof InfoModel>
export interface Info extends InfoType {}
type InfoSnapshotType = SnapshotOut<typeof InfoModel>
export interface InfoSnapshot extends InfoSnapshotType {}
export const createInfoDefaultModel = () => types.optional(InfoModel, {})
