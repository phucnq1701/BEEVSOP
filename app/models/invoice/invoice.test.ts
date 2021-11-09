import { InvoiceModel } from "./invoice"

test("can be created", () => {
  const instance = InvoiceModel.create({})

  expect(instance).toBeTruthy()
})
