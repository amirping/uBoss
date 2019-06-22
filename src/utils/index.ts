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
export const getCardsIDS = (cardsFromStore: any) => {
  let result: Array<any> = [];
  let ids: Array<string> = [];
  if (cardsFromStore != null && cardsFromStore != undefined) {
    let firstLevel = Object.keys(cardsFromStore);
    firstLevel.map(key => {
      let scLevelObject = cardsFromStore[key];
      let scLevelObjectKeys = Object.keys(scLevelObject);
      scLevelObjectKeys.map(underKey => {
        result.push(...scLevelObject[underKey]);
      });
    });
  }
  result.map(elem => {
    ids.push(elem.id);
  });
  return ids;
};
export const supportedAccounts = ["trello"];
export const accountsType = ["trello", "GitHub", "GitLab", "Jira"];
