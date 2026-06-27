export function getFormSubmitAction(): string {
  const formId =
    process.env.FORMSUBMIT_FORM_ID ?? "a170c3730a215cbd3994697b1e090b48";
  return `https://formsubmit.co/ajax/${formId}`;
}
