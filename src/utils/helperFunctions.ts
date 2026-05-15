import {LabTest} from '../types/selectTest'

export const getTestName = (test: LabTest) => {
  const matching = test?.names?.find(
    name =>
      (name.conceptNameType == 'SHORT' ||
        name.conceptNameType == 'FULLY_SPECIFIED') &&
      (!name.locale || name.locale == 'en'),
  )
  return matching?.name ?? test?.display ?? test?.name?.display
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
