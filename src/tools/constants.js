const F_WIDTH = 1920;
const F_HEIGHT = 1024;
const GAME_SCALE = 1;
const HUD_SCALE = 4;
const NCOLS = 15;
const NROWS = 8;

const T_SIDE = 64;
const DDY = 0.5;
const DDY_LIGHT = 0.25;
const DY_MAX = 64;
const JUMP_DY = -9;
const DDX = 0.8;
const DDX_ONAIR = 0.4;
const DX_MIN = -5;
const DX_MAX = 5;
const SPRITE_FSTEP = 5;
const JUMP_DELAY = 50;
const JUMP_STUN = 200;

const DIRECTIONS = {
  LEFT: -1,
  RIGHT: 1
};

const KEYS = {
  "left": "q",
  "right": "d",
  "jump": " "
};

const FILTERS_URL = 'src/filters/filters.json';

const M_PI = Math.PI;
const M_2PI = 2*M_PI;

let SHOW_HB = false;
