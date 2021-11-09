import { NewsModel } from "./news"

test("can be created", () => {
  const instance = NewsModel.create({})

  expect(instance).toBeTruthy()
})
