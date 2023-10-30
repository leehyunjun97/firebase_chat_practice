export const objTransArr = <T>(
  data: { [key: string]: T } | undefined,
  uuid: string
) => {
  if (!data) return;

  return Object.keys(data).map((key) => ({
    ...data[key],
    [uuid]: key,
  }));
};
