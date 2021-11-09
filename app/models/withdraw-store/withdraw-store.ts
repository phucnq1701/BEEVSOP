import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { WithdrawApi } from "../../services/api/withdraw-api"
import { withEnvironment } from "../extensions/with-environment"
import { WithdrawModel, WithdrawSnapshot } from "../withdraw/withdraw"

/**
 * Model description here for TypeScript hints.
 */
export const WithdrawStoreModel = types
  .model("WithdrawStore")
  .props({
    withdraws: types.optional(types.array(WithdrawModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveWithDraws: (withdrawSnapshots: WithdrawSnapshot[]) => {
      self.withdraws.replace(withdrawSnapshots)
    },
  }))
  .actions((self) => ({
    getWithDraw: async (param) => {
      const withdrawApi = new WithdrawApi(self.environment.api)
      const result = await withdrawApi.getWithdraw(param)
      if (result.kind === "ok") {
        self.saveWithDraws(result.withdraws)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
    getPayin: async (param) => {
      const withdrawApi = new WithdrawApi(self.environment.api)
      const result = await withdrawApi.getPayin(param)
      if (result.kind === "ok") {
        self.saveWithDraws(result.withdraws)
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

type WithdrawStoreType = Instance<typeof WithdrawStoreModel>
export interface WithdrawStore extends WithdrawStoreType {}
type WithdrawStoreSnapshotType = SnapshotOut<typeof WithdrawStoreModel>
export interface WithdrawStoreSnapshot extends WithdrawStoreSnapshotType {}
export const createWithdrawStoreDefaultModel = () => types.optional(WithdrawStoreModel, {})
