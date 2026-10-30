/* @ts-self-types="./repath.d.ts" */

/**
 * A frequency-domain run, kept separate from the transient one so switching
 * between analyses does not throw away the other's results.
 */
export class FrequencyRun {
  static __wrap(ptr) {
    const obj = Object.create(FrequencyRun.prototype);
    obj.__wbg_ptr = ptr;
    FrequencyRunFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FrequencyRunFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_frequencyrun_free(ptr, 0);
  }
  /**
   * Swept frequencies in hertz, as a `Float64Array`.
   * @returns {Float64Array}
   */
  frequencies() {
    const ret = wasm.frequencyrun_frequencies(this.__wbg_ptr);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
  }
  /**
   * Linear magnitude of one unknown across the sweep.
   * @param {number} index
   * @returns {Float64Array}
   */
  magnitude(index) {
    const ret = wasm.frequencyrun_magnitude(this.__wbg_ptr, index);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
  }
  /**
   * `{ names, node_count, point_count }` as JSON.
   * @returns {string}
   */
  meta() {
    let deferred2_0;
    let deferred2_1;
    try {
      const ret = wasm.frequencyrun_meta(this.__wbg_ptr);
      var ptr1 = ret[0];
      var len1 = ret[1];
      if (ret[3]) {
        ptr1 = 0;
        len1 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * Phase of one unknown across the sweep, in degrees, already unwrapped.
   * @param {number} index
   * @returns {Float64Array}
   */
  phase(index) {
    const ret = wasm.frequencyrun_phase(this.__wbg_ptr, index);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
  }
}
if (Symbol.dispose)
  FrequencyRun.prototype[Symbol.dispose] = FrequencyRun.prototype.free;

/**
 * A compiled circuit plus its solver state.
 */
export class Simulation {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SimulationFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_simulation_free(ptr, 0);
  }
  /**
   * Carry the live run to `until`, in simulated seconds from its start.
   *
   * Only the samples solved during this call are kept: the caller holds the
   * history, and a run that never ends cannot keep all of it here.
   * @param {number} until
   * @returns {string}
   */
  advance(until) {
    let deferred2_0;
    let deferred2_1;
    try {
      const ret = wasm.simulation_advance(this.__wbg_ptr, until);
      var ptr1 = ret[0];
      var len1 = ret[1];
      if (ret[3]) {
        ptr1 = 0;
        len1 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * Start a run that will be carried forward a piece at a time.
   *
   * Returns the same metadata a whole run does, plus the single timepoint at
   * t = 0 — so the drawing has something to show the instant it starts rather
   * than a frame of nothing.
   * @param {number} max_step
   * @returns {string}
   */
  beginLive(max_step) {
    let deferred2_0;
    let deferred2_1;
    try {
      const ret = wasm.simulation_beginLive(this.__wbg_ptr, max_step);
      var ptr1 = ret[0];
      var len1 = ret[1];
      if (ret[3]) {
        ptr1 = 0;
        len1 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * Current through one element across the run, as a `Float64Array`.
   * @param {number} index
   * @returns {Float64Array}
   */
  current(index) {
    const ret = wasm.simulation_current(this.__wbg_ptr, index);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
  }
  /**
   * Index of an unknown by label, e.g. `"v(out)"`. Returns -1 if absent.
   * @param {string} name
   * @returns {number}
   */
  indexOf(name) {
    const ptr0 = passStringToWasm0(
      name,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.simulation_indexOf(this.__wbg_ptr, ptr0, len0);
    return ret;
  }
  /**
   * How far the live run has got, in seconds.
   * @returns {number}
   */
  liveTime() {
    const ret = wasm.simulation_liveTime(this.__wbg_ptr);
    return ret;
  }
  /**
   * Build a simulation from a netlist, given as a JSON string.
   * @param {string} netlist_json
   */
  constructor(netlist_json) {
    const ptr0 = passStringToWasm0(
      netlist_json,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.simulation_new(ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0];
    SimulationFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * Solve the DC operating point. Returns `{ names, values }` as JSON.
   * @returns {string}
   */
  operatingPoint() {
    let deferred2_0;
    let deferred2_1;
    try {
      const ret = wasm.simulation_operatingPoint(this.__wbg_ptr);
      var ptr1 = ret[0];
      var len1 = ret[1];
      if (ret[3]) {
        ptr1 = 0;
        len1 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * Run a transient analysis. The waveforms stay in Rust; fetch them with
   * [`Simulation::time`] and [`Simulation::signal`].
   * @param {number} stop
   * @param {number} max_step
   * @returns {string}
   */
  runTransient(stop, max_step) {
    let deferred2_0;
    let deferred2_1;
    try {
      const ret = wasm.simulation_runTransient(this.__wbg_ptr, stop, max_step);
      var ptr1 = ret[0];
      var len1 = ret[1];
      if (ret[3]) {
        ptr1 = 0;
        len1 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * Most solver steps one `advance` may take before returning early.
   *
   * The frame's share of the machine, in steps rather than milliseconds:
   * the caller measures how fast steps are going and sizes this to fit.
   * @param {number} steps
   * @returns {boolean}
   */
  setFrameBudget(steps) {
    const ret = wasm.simulation_setFrameBudget(this.__wbg_ptr, steps);
    return ret !== 0;
  }
  /**
   * Change the live run's step ceiling from here on, in seconds.
   * @param {number} step
   * @returns {boolean}
   */
  setLiveMaxStep(step) {
    const ret = wasm.simulation_setLiveMaxStep(this.__wbg_ptr, step);
    return ret !== 0;
  }
  /**
   * Move a logic source to a level, from `at` onwards.
   * @param {string} name
   * @param {string} state
   * @param {number} at
   * @returns {boolean}
   */
  setLogic(name, state, at) {
    const ptr0 = passStringToWasm0(
      name,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      state,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.simulation_setLogic(
      this.__wbg_ptr,
      ptr0,
      len0,
      ptr1,
      len1,
      at,
    );
    return ret !== 0;
  }
  /**
   * Give a source a new waveform from here on — a hand on a switch.
   *
   * The waveform is the JSON the netlist uses, so the caller can hand over a
   * contact's whole bounce train anchored wherever it likes.
   * @param {string} name
   * @param {string} waveform_json
   * @returns {boolean}
   */
  setSourceWaveform(name, waveform_json) {
    const ptr0 = passStringToWasm0(
      name,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      waveform_json,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.simulation_setSourceWaveform(
      this.__wbg_ptr,
      ptr0,
      len0,
      ptr1,
      len1,
    );
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] !== 0;
  }
  /**
   * One unknown from the last run, as a `Float64Array`.
   * @param {number} index
   * @returns {Float64Array}
   */
  signal(index) {
    const ret = wasm.simulation_signal(this.__wbg_ptr, index);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
  }
  /**
   * Time axis of the last run, as a `Float64Array`.
   * @returns {Float64Array}
   */
  time() {
    const ret = wasm.simulation_time(this.__wbg_ptr);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
  }
}
if (Symbol.dispose)
  Simulation.prototype[Symbol.dispose] = Simulation.prototype.free;

/**
 * Sweep a circuit's frequency response.
 * @param {string} netlist_json
 * @param {number} start_hz
 * @param {number} stop_hz
 * @param {number} points_per_decade
 * @returns {FrequencyRun}
 */
export function runFrequencySweep(
  netlist_json,
  start_hz,
  stop_hz,
  points_per_decade,
) {
  const ptr0 = passStringToWasm0(
    netlist_json,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.runFrequencySweep(
    ptr0,
    len0,
    start_hz,
    stop_hz,
    points_per_decade,
  );
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return FrequencyRun.__wrap(ret[0]);
}

export function start() {
  wasm.start();
}

/**
 * Engine version, so the UI can report which build it is running.
 * @returns {string}
 */
export function version() {
  let deferred1_0;
  let deferred1_1;
  try {
    const ret = wasm.version();
    deferred1_0 = ret[0];
    deferred1_1 = ret[1];
    return getStringFromWasm0(ret[0], ret[1]);
  } finally {
    wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
  }
}
function __wbg_get_imports() {
  const import0 = {
    __proto__: null,
    __wbg_Error_92b29b0548f8b746: function (arg0, arg1) {
      const ret = Error(getStringFromWasm0(arg0, arg1));
      return ret;
    },
    __wbg___wbindgen_throw_344f42d3211c4765: function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbg_error_a6fa202b58aa1cd3: function (arg0, arg1) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    },
    __wbg_new_227d7c05414eb861: function () {
      const ret = new Error();
      return ret;
    },
    __wbg_stack_3b0d974bbf31e44f: function (arg0, arg1) {
      const ret = arg1.stack;
      const ptr1 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbindgen_init_externref_table: function () {
      const table = wasm.__wbindgen_externrefs;
      const offset = table.grow(4);
      table.set(0, undefined);
      table.set(offset + 0, undefined);
      table.set(offset + 1, null);
      table.set(offset + 2, true);
      table.set(offset + 3, false);
    },
  };
  return {
    __proto__: null,
    "./repath_bg.js": import0,
  };
}

const FrequencyRunFinalization =
  typeof FinalizationRegistry === "undefined"
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) => wasm.__wbg_frequencyrun_free(ptr, 1));
const SimulationFinalization =
  typeof FinalizationRegistry === "undefined"
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) => wasm.__wbg_simulation_free(ptr, 1));

function getArrayF64FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (
    cachedDataViewMemory0 === null ||
    cachedDataViewMemory0.buffer.detached === true ||
    (cachedDataViewMemory0.buffer.detached === undefined &&
      cachedDataViewMemory0.buffer !== wasm.memory.buffer)
  ) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
  if (
    cachedFloat64ArrayMemory0 === null ||
    cachedFloat64ArrayMemory0.byteLength === 0
  ) {
    cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
  }
  return cachedFloat64ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
  return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (
    cachedUint8ArrayMemory0 === null ||
    cachedUint8ArrayMemory0.byteLength === 0
  ) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8ArrayMemory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7f) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, (len = offset + arg.length * 3), 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);

    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_externrefs.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}

let cachedTextDecoder = new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true,
    });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(
    getUint8ArrayMemory0().subarray(ptr, ptr + len),
  );
}

const cachedTextEncoder = new TextEncoder();

if (!("encodeInto" in cachedTextEncoder)) {
  cachedTextEncoder.encodeInto = function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length,
    };
  };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
  wasmInstance = instance;
  wasm = instance.exports;
  wasmModule = module;
  cachedDataViewMemory0 = null;
  cachedFloat64ArrayMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  wasm.__wbindgen_start();
  return wasm;
}

async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        const validResponse = module.ok && expectedResponseType(module.type);

        if (
          validResponse &&
          module.headers.get("Content-Type") !== "application/wasm"
        ) {
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            e,
          );
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }

  function expectedResponseType(type) {
    switch (type) {
      case "basic":
      case "cors":
      case "default":
        return true;
    }
    return false;
  }
}

function initSync(module) {
  if (wasm !== undefined) return wasm;

  if (module !== undefined) {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({ module } = module);
    } else {
      console.warn(
        "using deprecated parameters for `initSync()`; pass a single object instead",
      );
    }
  }

  const imports = __wbg_get_imports();
  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }
  const instance = new WebAssembly.Instance(module, imports);
  return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
  if (wasm !== undefined) return wasm;

  if (module_or_path !== undefined) {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn(
        "using deprecated parameters for the initialization function; pass a single object instead",
      );
    }
  }

  if (module_or_path === undefined) {
    module_or_path = new URL("repath_bg.wasm", import.meta.url);
  }
  const imports = __wbg_get_imports();

  if (
    typeof module_or_path === "string" ||
    (typeof Request === "function" && module_or_path instanceof Request) ||
    (typeof URL === "function" && module_or_path instanceof URL)
  ) {
    module_or_path = fetch(module_or_path);
  }

  const { instance, module } = await __wbg_load(await module_or_path, imports);

  return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
