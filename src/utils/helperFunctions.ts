import {LabTest} from '../types/selectTest'

export const getTestName = (test: LabTest) => {
  const testName = test?.names?.filter(
    name =>
      name.conceptNameType == 'SHORT' ||
      name.conceptNameType == 'FULLY_SPECIFIED',
  )[0].name
  console.log('first', test)
  return testName ? testName : undefined
}

export const getShortName = (
  testName: string,
  allTestsAndPanels: Array<LabTest>,
) => {
  const names = testName?.split(',')
  let concatNames = ''
  for (let nameIndex = 0; nameIndex < names?.length; nameIndex++) {
    for (let testIndex = 0; testIndex < allTestsAndPanels.length; testIndex++) {
      if (
        allTestsAndPanels[testIndex].name.display === names[nameIndex].trim()
      ) {
        concatNames =
          concatNames === ''
            ? getTestName(allTestsAndPanels[testIndex])
            : `${concatNames}, ${getTestName(allTestsAndPanels[testIndex])}`

        break
      }
    }
  }
  return concatNames ? concatNames : testName
}
