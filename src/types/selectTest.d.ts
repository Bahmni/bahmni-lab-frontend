export interface Name {
  display: string
  uuid: string
}

export interface Names {
  display: string
  name: string
  conceptNameType: string
}

export interface ConceptClass {
  uuid: string
  name: string
  description: string
}

export interface LabTest {
  uuid: string
  name: Name
  names: Array<Names>
  set: boolean
  conceptClass?: ConceptClass
  setMembers?: Array<LabTest>
}

export interface LabTestResult {
  data: {
    results: Array<LabTest>
  }
}
