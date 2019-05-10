export const shortName = (name: string, length?: number) => {
  let Sname = "";
  let longName = name;
  longName.split(/[\s,-]+/).map((st: string) => {
    Sname += st[0].toUpperCase();
  });
  return Sname;
};
export const datediff = (first: any, second: any) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};
