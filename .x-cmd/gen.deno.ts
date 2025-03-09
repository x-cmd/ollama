
const decoder = new TextDecoder("utf-8");
let data = "";
const buf = new Uint8Array(1024); // Adjust buffer size as needed
while (true) {
  const n = await Deno.stdin.read(buf);
  if (n === null) break;
  data += decoder.decode(buf.subarray(0, n));
}

const obj = JSON.parse( data )

const csv = obj.map(item => {
  const variants = item.variants.map(v => [item.name, v.size, "", item.downloads, item.modified, item.description].join(","));
  return variants.join("\n");
}).join("\n");

console.log("model,size,tags,pulls,updated,description")
console.log(csv);

