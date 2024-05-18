export function checkArgv(): string {
  const typeIndex = process.argv.indexOf("--type");

  let typeValue: string;

  if (typeIndex !== -1 && typeIndex + 1 < process.argv.length) {
    typeValue = process.argv[typeIndex + 1];

    console.log("# Type selected! --->", typeValue);
  } else {
    typeValue = process.env.DEFAULT_SUPPORT as string;

    console.log(
      "# Type not selected, default ---->",
      process.env.DEFAULT_SUPPORT
    );
  }

  return typeValue;
}
