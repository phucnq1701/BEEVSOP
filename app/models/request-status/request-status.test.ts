import { RequestStatusModel } from "./request-status"

test("can be created", () => {
  const instance = RequestStatusModel.create({})

  expect(instance).toBeTruthy()
})
