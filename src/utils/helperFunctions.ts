import { LabTest } from "../types/selectTest"

export const getTestName = (test: LabTest) => {
  const testName = test.names.filter(
    name =>
      name.conceptNameType == 'SHORT' ||
      name.conceptNameType == 'FULLY_SPECIFIED',
  )[0].name
  return testName ? testName : undefined
}