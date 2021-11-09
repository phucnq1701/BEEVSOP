import { WithdrawStoreModel } from "./withdraw-store"

test("can be created", () => {
  const instance = WithdrawStoreModel.create({})

  expect(instance).toBeTruthy()
})
