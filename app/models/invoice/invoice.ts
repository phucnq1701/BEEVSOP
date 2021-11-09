import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const InvoiceModel = types
  .model("Invoice")
  .props({
    ID: types.maybeNull(types.number),
    ThuocKhachHang: types.maybeNull(types.string),
    DienThoai: types.maybeNull(types.string),
    Email: types.maybeNull(types.string),
    ThuocKhoiNha: types.maybeNull(types.string),
    ThuocTangLau: types.maybeNull(types.string),
    TrangThai: types.maybeNull(types.string),
    TenDichVu: types.maybeNull(types.string),
    KyThanhToan: types.maybeNull(types.string),
    SoTien: types.maybeNull(types.number),
    DaThu: types.maybeNull(types.number),
    ConLai: types.maybeNull(types.number),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type InvoiceType = Instance<typeof InvoiceModel>
export interface Invoice extends InvoiceType {}
type InvoiceSnapshotType = SnapshotOut<typeof InvoiceModel>
export interface InvoiceSnapshot extends InvoiceSnapshotType {}
export const createInvoiceDefaultModel = () => types.optional(InvoiceModel, {})
