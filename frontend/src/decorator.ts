export const decorator = (...args0: any) => {
  return (...args1: any) => console.log(process.env.API_URI);
};
