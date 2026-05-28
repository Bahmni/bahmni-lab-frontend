import {LabTest} from '../types/selectTest'

export const getTestName = (test: LabTest) => {
  const userLocale = localStorage.getItem('i18nextLng') ?? 'en'
  const localeNames = (test?.names ?? []).filter(
    n => !n.locale || n.locale === userLocale,
  )
  return (
    localeNames.find(n => n.conceptNameType === 'SHORT')?.name ??
    localeNames.find(n => n.conceptNameType == null)?.name ??
    localeNames.find(n => n.conceptNameType === 'FULLY_SPECIFIED')?.name ??
    test?.display ??
    test?.name?.display
  )
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
