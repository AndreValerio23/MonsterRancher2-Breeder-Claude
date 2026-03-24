const STAT_NAMES = ["Life", "Power", "Intelligence", "Skill", "Speed", "Defense"];
const STAT_ABBR  = ["L", "P", "I", "Sk", "Sp", "D"];

const GAIN_TO_MULT = {
    0: 0.00,
    1: 0.25,
    2: 0.50,
    3: 1.00,
    4: 1.50,
    5: 2.00
};

// gains = [Life, Power, Intelligence, Skill, Speed, Defense] (multipliers config)
// baseline = [Life, Power, Intelligence, Skill, Speed, Defense] (base status for born monster)
const MONSTER_DATA = {
    "Pixie":       {gains: [2,2,4,3,4,1], baseline: [100,100,160,130,120,50]},
    "Dragon":      {gains: [4,4,2,3,2,3], baseline: [120,130,90,100,90,130]},
    "Centaur":     {gains: [3,3,2,4,4,2], baseline: [100,120,80,130,140,90]},
    "ColorPandora":{gains: [2,2,4,4,3,2], baseline: [80,80,150,160,100,70]},
    "Beaclon":     {gains: [3,4,1,3,2,4], baseline: [140,160,40,100,80,160]},
    "Henger":      {gains: [2,2,4,3,2,4], baseline: [120,100,160,120,80,160]},
    "Wracky":      {gains: [2,3,3,4,4,1], baseline: [80,100,120,160,160,40]},
    "Golem":       {gains: [4,4,1,2,1,5], baseline: [200,180,30,60,30,200]},
    "Zuum":        {gains: [3,3,2,4,4,2], baseline: [120,120,80,130,150,80]},
    "Durahan":     {gains: [4,4,2,3,2,4], baseline: [160,170,60,100,70,170]},
    "Arrow Head":  {gains: [2,3,3,4,5,1], baseline: [80,100,120,150,180,40]},
    "Tiger":       {gains: [2,2,4,5,3,1], baseline: [90,80,130,170,100,60]},
    "Hopper":      {gains: [2,2,3,4,5,1], baseline: [80,70,100,150,180,40]},
    "Suezo":       {gains: [2,1,4,4,3,1], baseline: [100,60,160,170,100,50]},
    "Baku":        {gains: [4,3,2,2,3,4], baseline: [180,130,80,70,100,160]},
    "Gali":        {gains: [2,2,4,4,3,2], baseline: [80,80,160,160,100,80]},
    "Kato":        {gains: [3,3,4,4,4,1], baseline: [100,110,150,160,150,40]},
    "Zilla":       {gains: [4,5,1,2,1,5], baseline: [200,200,30,50,30,200]},
    "Bajarl":      {gains: [3,2,4,3,3,2], baseline: [120,80,160,120,120,80]},
    "Mew":         {gains: [2,2,4,4,4,1], baseline: [80,70,160,160,150,40]},
    "Phoenix":     {gains: [3,2,4,4,4,2], baseline: [110,80,160,160,160,70]},
    "Ghost":       {gains: [1,2,5,4,3,1], baseline: [50,80,200,160,100,50]},
    "Metalner":    {gains: [2,2,4,4,3,2], baseline: [80,80,160,160,110,80]},
    "Sponge":      {gains: [3,2,3,3,3,3], baseline: [120,80,120,120,120,120]},
    "Jell":        {gains: [3,2,3,4,2,4], baseline: [120,80,120,160,80,160]},
    "Hare":        {gains: [2,2,4,5,4,1], baseline: [80,70,150,180,160,40]},
    "Baddies":     {gains: [3,3,3,4,3,2], baseline: [110,110,120,160,110,80]},
    "Mono Eye":    {gains: [2,2,4,5,3,1], baseline: [90,80,130,170,100,60]},
    "Plant":       {gains: [3,2,4,3,3,3], baseline: [120,80,160,120,120,120]},
    "Monol":       {gains: [3,2,4,4,2,4], baseline: [120,80,160,160,80,160]},
    "Naga":        {gains: [3,3,3,4,4,2], baseline: [110,110,110,160,160,70]},
    "Worm":        {gains: [3,4,2,3,2,5], baseline: [120,160,80,110,80,200]},
    "Gitan":       {gains: [3,3,3,3,4,2], baseline: [120,110,110,110,160,80]},
    "Mock":        {gains: [3,3,3,3,3,3], baseline: [120,120,120,120,120,120]},
    "Joker":       {gains: [2,2,5,5,3,1], baseline: [70,70,180,180,100,40]},
    "Gaboo":       {gains: [4,4,1,2,2,5], baseline: [180,180,30,70,70,200]},
    "Jill":        {gains: [3,4,2,3,2,4], baseline: [130,160,80,110,80,160]},
    "Undine":      {gains: [3,2,4,3,4,2], baseline: [120,80,160,110,160,80]},
    "Niton":       {gains: [2,3,4,3,2,4], baseline: [80,110,160,120,80,160]},
    "Zan":         {gains: [2,3,3,4,4,2], baseline: [80,110,110,160,160,70]},
    "Ducken":      {gains: [3,2,3,3,4,2], baseline: [120,80,110,110,160,80]},
    "Orion":       {gains: [2,2,4,5,4,1], baseline: [80,70,150,180,160,40]},
    "Hachitaro":   {gains: [3,3,3,4,3,2], baseline: [120,120,110,160,110,70]}
};

const BREED_LIST = Object.keys(MONSTER_DATA).sort();

// TODO na Fase 2: Mapear a matriz de Compatibilidade do Dadge (Lineage Match)
