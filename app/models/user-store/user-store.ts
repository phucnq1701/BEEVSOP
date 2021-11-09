import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserApi } from "../../services/api/user-api"
import { withEnvironment } from "../extensions/with-environment"
import { UserModel, UserSnapshot } from "../user/user"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    cards: types.optional(types.array(UserModel), []),
    selected: types.optional(types.number, -1),
    phone: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUsers: (userSnapshots: UserSnapshot[]) => {
      console.log(userSnapshots)
      self.cards.replace(userSnapshots)
    },
    selectCard: (index: number) => {
      self.selected = index
    },
    savePhone: (phone: string) => {
      self.phone = phone
    },
  }))
  .actions((self) => ({
    getUser: async (param) => {
      const userApi = new UserApi(self.environment.api)
      const result = await userApi.getUser(param)
      if (result.kind === "ok") {
        self.saveUsers(result.users)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
  }))// eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
