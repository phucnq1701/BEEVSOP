import { WithdrawModel } from "./withdraw"

test("can be created", () => {
  const instance = WithdrawModel.create({})

  expect(instance).toBeTruthy()
})
