export type Input = {
    type?: string,
    placeholder?: string,
    icon:string,
    name:string,
}
export interface FormState {
    [key:string]: {
      value: string,
      error:boolean
    },
}