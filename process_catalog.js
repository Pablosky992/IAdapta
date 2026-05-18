import fs from 'fs';
let content = fs.readFileSync('cataleg.json', 'utf8');
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}
const data = JSON.parse(content);

const cleaned = data.map(item => {
    const parsePrice = (val) => val ? val.replace(',', '.') : '0';
    const fixText = (text) => {
        if (!text) return '';
        return text
            .replace(/¢/g, 'ó')
            .replace(/‡/g, 'ç')
            .replace(/¡/g, 'í')
            .replace(/…/g, 'à')
            .replace(/·/g, 'À')
            .replace(/£/g, '·')  // £ represents the Catalan middle dot · (geminate L l·l)
            .replace(/Š/g, 'è')  // Š represents è (e.g. elŠctrica -> elèctrica)
            .replace(/•/g, 'ò')  // • represents ò (e.g. Pr•tesis -> Pròtesis, t•rax -> tòrax)
            .replace(/‚/g, 'é')  // ‚ represents é (e.g. m‚s -> més)
            .replace(/ÿ/g, '')   // ÿ is a garbage character to be removed
            .replace(/®/g, '«')  // ® represents «
            .replace(/¯/g, '»')  // ¯ represents »
            .replace(/\?/g, "'") // ? represents an apostrophe '
            .replace(/\ufffd/g, '?');
    };

    return {
        gC: item["Grup - codi"],
        gD: fixText(item["Grup - descripci¢"] || item["Grup - descripci\ufffd"]),
        sC: item["Subgrup - codi"],
        sD: fixText(item["Subgrup - descripci¢"] || item["Subgrup - descripci\ufffd"]),
        cC: item["Categoria - codi"],
        cD: fixText(item["Categoria aparell"]),
        tC: item["Tipus de producte - codi"],
        tD: fixText(item["Tipus de producte "] || item["Tipus de producte"]),
        p: parsePrice(item["Import m\u2026xim de facturaci\u00a2 (?)"] || item["Import m\ufffdxim de facturaci\ufffd (?)"]),
        u: parsePrice(item["Aportaci\u00a2 usuari/a (?)"] || item["Aportaci\ufffd usuari/a (?)"]),
        s: parsePrice(item["Aportaci\u00a2 CatSalut (?)"] || item["Aportaci\ufffd CatSalut (?)"]),
        v: item["Indicador validaci¢ sanit…ria"] || item["Indicador validaci\ufffd sanit\ufffdria"],
        m: item["Periodicitat prescripci¢ (mesos)"] || item["Periodicitat prescripci\ufffd (mesos)"]
    };
});

fs.writeFileSync('catalogData.js', 'window.CATALOG_DATA = ' + JSON.stringify(cleaned) + ';');
console.log('Processed ' + cleaned.length + ' items with fixes for ú');
