import { RequestTypeModel } from "./request-type"

test("can be created", () => {
  const instance = RequestTypeModel.create({})

  expect(instance).toBeTruthy()
})
