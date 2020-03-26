export const uniq = <T, U>(key: keyof T & U, array: T[]): T[] => {
   const set: any = {};
   array.forEach(item => (set[item[key]] = item));
   return Object.values(set);
};
