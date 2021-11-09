import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { InvoiceApi } from "../../services/api/invoice-api"
import { withEnvironment } from "../extensions/with-environment"
import { InvoiceModel, InvoiceSnapshot } from "../invoice/invoice"

/**
 * Model description here for TypeScript hints.
 */
export const InvoiceStoreModel = types
  .model("InvoiceStore")
  .props({
    invoices: types.optional(types.array(InvoiceModel), []),
    invoicesComplete: types.optional(types.array(InvoiceModel), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions((self) => ({
    saveInvoice: (newsSnapshots: InvoiceSnapshot[], isLoadmore) => {
      if (isLoadmore) {
        const jsonData: InvoiceSnapshot[] = JSON.parse(JSON.stringify(self.invoices))
        self.invoices.replace([
          ...new Map(jsonData.concat(newsSnapshots).map((item) => [item.ID, item])).values(),
        ])
      } else {
        self.invoices.replace(newsSnapshots)
      }
    },
    saveInvoiceComplete: (newsSnapshots: InvoiceSnapshot[], isLoadmore) => {
      if (isLoadmore) {
        const jsonData: InvoiceSnapshot[] = JSON.parse(JSON.stringify(self.invoicesComplete))
        self.invoicesComplete.replace([
          ...new Map(jsonData.concat(newsSnapshots).map((item) => [item.ID, item])).values(),
        ])
      } else {
        self.invoicesComplete.replace(newsSnapshots)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getInvoices: async (param, isLoadmore) => {
      const newsApi = new InvoiceApi(self.environment.api)
      const result = await newsApi.getInvoice(param)
      if (result.kind === "ok") {
        self.saveInvoice(result.invoices, isLoadmore)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
    getInvoicesComplete: async (param, isLoadmore) => {
      const newsApi = new InvoiceApi(self.environment.api)
      const result = await newsApi.getInvoiceComplete(param)
      if (result.kind === "ok") {
        self.saveInvoiceComplete(result.invoices, isLoadmore)
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

type InvoiceStoreType = Instance<typeof InvoiceStoreModel>
export interface InvoiceStore extends InvoiceStoreType {}
type InvoiceStoreSnapshotType = SnapshotOut<typeof InvoiceStoreModel>
export interface InvoiceStoreSnapshot extends InvoiceStoreSnapshotType {}
export const createInvoiceStoreDefaultModel = () => types.optional(InvoiceStoreModel, {})
