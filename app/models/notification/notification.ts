import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const NotificationModel = types
  .model("Notification")
  .props({
    ID: types.maybeNull(types.number),
    DiDong: types.maybeNull(types.string),
    NoiDung: types.maybeNull(types.string),
    MaLGD: types.maybeNull(types.number),
    MaGD: types.maybeNull(types.number),
    LoaiApp: types.maybeNull(types.number),
    NgayGui: types.maybeNull(types.string),
    MaSo: types.maybeNull(types.string),
    TenCTDK: types.maybeNull(types.string),
  })

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type NotificationType = Instance<typeof NotificationModel>
export interface Notification extends NotificationType {}
type NotificationSnapshotType = SnapshotOut<typeof NotificationModel>
export interface NotificationSnapshot extends NotificationSnapshotType {}
export const createNotificationDefaultModel = () => types.optional(NotificationModel, {})
