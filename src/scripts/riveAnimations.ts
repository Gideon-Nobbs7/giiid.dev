import type { Rive } from "@rive-app/canvas";

export type Animatable = {
  canvas: HTMLCanvasElement;
  riveInstance: Rive;
};

const RIVE_WASM_URL = "/assets/deps/rive.wasm";

let riveModulePromise: Promise<typeof import("@rive-app/canvas")> | undefined;

function loadRive() {
  if (!riveModulePromise) {
    riveModulePromise = import("@rive-app/canvas").then((mod) => {
      mod.RuntimeLoader.setWasmUrl(RIVE_WASM_URL);
      return mod;
    });
  }

  return riveModulePromise;
}

export async function buildRiveCanvas(src: string): Promise<Animatable> {
  const { Rive } = await loadRive();

  // Create canvas child
  const canvas = document.createElement("canvas");
  canvas.style.display = "inline";
  canvas.className = "h-[3.5rem] w-[4rem] md:-ml-3 -ml-1";

  // Instantiate rive
  const riveInstance = new Rive({
    src,
    canvas,
  });

  return { canvas, riveInstance };
}

let isSequencePlaying = false;
let idleTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Plays rive animations in sequence, chaining the next instance when the
 * current one stops. Guards against overlapping sequences.
 */
export async function playRiveSequence(instances: Animatable[]) {
  if (isSequencePlaying || instances.length === 0) {
    return;
  }

  isSequencePlaying = true;

  const { EventType } = await loadRive();

  const playInstanceAndNext = (idx: number) => {
    if (idx >= instances.length) return;

    const instance = instances[idx].riveInstance;
    instance.play("root");

    instance.on(EventType.Stop, () => {
      // Recursively play next animation
      if (idx < instances.length - 1) {
        playInstanceAndNext(idx + 1);
      } else {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          // Space out activations
          isSequencePlaying = false;
        }, 3000);
      }
    });
  };

  playInstanceAndNext(0);
}