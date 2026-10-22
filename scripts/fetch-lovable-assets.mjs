// Descarga las imágenes y videos que Lovable guardaba fuera del repo
// (archivos *.asset.json con url "/__l5e/assets-v1/...") y los deja en
// public/ con la misma ruta, para que la web los sirva desde Netlify.
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync } from "fs";
import { dirname, join } from "path";

const HOSTS = ["https://micaistudio.com", "https://micaela-ai-wonder.lovable.app"];

function findAssetFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return findAssetFiles(p);
    return e.name.endsWith(".asset.json") ? [p] : [];
  });
}

let failed = 0;
for (const file of findAssetFiles("src")) {
  const asset = JSON.parse(readFileSync(file, "utf8"));
  const target = join("public", asset.url);
  if (existsSync(target) && statSync(target).size === asset.size) {
    console.log(`ok (ya estaba)  ${asset.url}`);
    continue;
  }
  let saved = false;
  for (const host of HOSTS) {
    const res = await fetch(host + asset.url);
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || type.startsWith("text/html")) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, buf);
    console.log(`descargado ${asset.url} (${buf.length} bytes, esperado ${asset.size}) desde ${host}`);
    saved = true;
    break;
  }
  if (!saved) {
    console.error(`FALLÓ ${asset.url}`);
    failed++;
  }
}
if (failed) process.exit(1);
