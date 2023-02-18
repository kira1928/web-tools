export const saveData = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  return function (blob: Blob, fileName: string) {
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();

export function parseFileSizeUnitToByteCount(unit: string): number {
  if (!unit || unit.length > 2) {
    throw new Error(`invalid unit '${unit}'`);
  }
  unit = unit.trim().toLowerCase();
  switch (unit) {
    case "gb":
      return 1024 * 1024 * 1024;
    case "mb":
      return 1024 * 1024;
    case "kb":
      return 1024;
    case "b":
      return 1;
  }
  throw new Error(`invalid unit '${unit}'`);
}
