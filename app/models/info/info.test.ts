import { InfoModel } from "./info"

test("can be created", () => {
  const instance = InfoModel.create({})

  expect(instance).toBeTruthy()
})
