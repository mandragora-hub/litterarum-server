const isAbsoluteURL = (url: string) => {
  const RgExp = new RegExp("^(?:[a-z]+:)?//", "i");
  return RgExp.test(url);
};

export default isAbsoluteURL