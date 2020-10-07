type VariableEmail = {
  [key: string]: string | number;
};
export default interface ParseTemplateDTOInterface {
  view: string;
  variables: VariableEmail;
}
