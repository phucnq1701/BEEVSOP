import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NotificationApi } from "../../services/api/notification-api"
import { withEnvironment } from "../extensions/with-environment"
import { NotificationModel, NotificationSnapshot } from "../notification/notification"

/**
 * Model description here for TypeScript hints.
 */
export const NotificationStoreModel = types
  .model("NotificationStore")
  .props({
    notiList: types.optional(types.array(NotificationModel), []),
  })
  .views((self) => ({}))
  .extend(withEnvironment) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveNotifs: (newsSnapshots: NotificationSnapshot[]) => {
      const jsonData:NotificationSnapshot[]  = JSON.parse(JSON.stringify(self.notiList));
      self.notiList.replace([...new Map( jsonData.concat(newsSnapshots).map(item => [item.ID, item])).values()])    },
  }))
  .actions((self) => ({
    getNotifs: async (param) => {
      const notifApi = new NotificationApi(self.environment.api)
      const result = await notifApi.getNotification(param)
      if (result.kind === "ok") {
        self.saveNotifs(result.notifs)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type NotificationStoreType = Instance<typeof NotificationStoreModel>
export interface NotificationStore extends NotificationStoreType {}
type NotificationStoreSnapshotType = SnapshotOut<typeof NotificationStoreModel>
export interface NotificationStoreSnapshot extends NotificationStoreSnapshotType {}
export const createNotificationStoreDefaultModel = () => types.optional(NotificationStoreModel, {})
