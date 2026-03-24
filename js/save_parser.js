// save_parser.js - Lógica 100% Client-Side para encontrar dados de status injetados no arquivo .sav

const BREED_NAMES = [
    "Pixie","Dragon","Centaur","ColorPandora","Beaclon","Henger","Wracky","Golem",
    "Zuum","Durahan","Arrow Head","Tiger","Hopper","Suezo","Baku","Gali","Kato",
    "Zilla","Bajarl","Mew","Phoenix","Ghost","Metalner","Sponge","Jell","Hare",
    "Baddies","Mono Eye","Plant","Monol","Naga","Worm","Gitan","???","Mock","Joker",
    "Gaboo","Jill","Undine","Niton","Mock","Zan","Ducken","Psiroller","Baronrang",
    "Poritoka","Sueki Suezo","???","Akwi","Orion","Hachitaro","Eared Mew","Puki",
    "Ripper"
];

function handleSaveFileDrop(file, parentNum) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const buffer = e.target.result;
        const view = new DataView(buffer);
        const data = new Uint8Array(buffer);
        let monsters = [];

        // O formato do MR2DX não é aberto, então vasculhamos todo o arquivo blocos de 0x200 bytes
        // procurando algo que pareça um bloco de monstro válido (heuristic scanner).
        for (let base = 0; base < data.length - 0x50; base += 0x200) {
            try {
                // Tenta extrair um nome ASCII de 16 caracteres
                let name = "";
                for (let i=0; i<16; i++) {
                    let c = data[base + i];
                    if (c === 0) break;
                    if (c >= 32 && c < 128) name += String.fromCharCode(c);
                }
                name = name.trim();
                // Assumimos que monstros vivos devem ter caracteres legíveis
                if (name.length === 0) continue;

                // Offsets para main breed e sub breed (conhecidos pela comunidade de CT)
                let main_idx = data[base + 0x10];
                let sub_idx  = data[base + 0x11];
                
                // Valida as raças
                if (main_idx >= BREED_NAMES.length || sub_idx >= BREED_NAMES.length) continue;

                // Offsets dos Status: Life, Pow, Int, Skl, Spd, Def iniciam em +0x20 e tem 2 bytes cada (Uint16 LE)
                let stats = [];
                let valid = true;
                for (let i=0; i<6; i++) {
                    let s = view.getUint16(base + 0x20 + (i*2), true);
                    // Stats devem estar no intervalo palpável do jogo (10 a 999)
                    if (s < 10 || s > 999) { valid = false; break; }
                    stats.push(s);
                }
                
                if (!valid) continue;

                // Monstro válido detectado no memory block
                monsters.push({
                    name: name,
                    main: BREED_NAMES[main_idx],
                    sub: BREED_NAMES[sub_idx],
                    stats: stats
                });
            } catch(err) {
                // Bloco binário inválido, ignora.
            }
        }

        if (monsters.length > 0) {
            fillParentFromSave(parentNum, monsters[0]);
            alert(`✅ Sucesso! O monstro "${monsters[0].name}" [${monsters[0].main}/${monsters[0].sub}] foi detectado no Save e carregado!`);
        } else {
            alert("❌ Nenhum monstro válido foi encontrado.\nVerifique se o monstro está descongelado na fazenda ou se o save percente ao MR2 DX PC.");
        }
    };

    reader.readAsArrayBuffer(file);
}

function fillParentFromSave(p, m) {
    document.getElementById(`p${p}-name`).value = m.name;
    document.getElementById(`p${p}-main`).value = m.main;
    document.getElementById(`p${p}-sub`).value  = m.sub;
    
    document.getElementById(`p${p}-life`).value = m.stats[0];
    document.getElementById(`p${p}-pow`).value  = m.stats[1];
    document.getElementById(`p${p}-int`).value  = m.stats[2];
    document.getElementById(`p${p}-skl`).value  = m.stats[3];
    document.getElementById(`p${p}-spd`).value  = m.stats[4];
    document.getElementById(`p${p}-def`).value  = m.stats[5];
    
    // Dispara a atualização visual das ordens na UI
    if (typeof updateAdjustedUI === 'function') {
        updateAdjustedUI(p);
    }
}
