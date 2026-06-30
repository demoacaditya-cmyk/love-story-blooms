import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function HeartGeometry() {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0;
    const y = 0;
    shape.moveTo(x + 0, y + 0.5);
    shape.bezierCurveTo(x + 0, y + 0.5, x - 0.5, y + 1.5, x - 1.5, y + 1.5);
    shape.bezierCurveTo(x - 3.2, y + 1.5, x - 3.2, y - 0.6, x - 3.2, y - 0.6);
    shape.bezierCurveTo(x - 3.2, y - 1.7, x - 2.1, y - 2.9, x + 0, y - 4.0);
    shape.bezierCurveTo(x + 2.1, y - 2.9, x + 3.2, y - 1.7, x + 3.2, y - 0.6);
    shape.bezierCurveTo(x + 3.2, y - 0.6, x + 3.2, y + 1.5, x + 1.5, y + 1.5);
    shape.bezierCurveTo(x + 0.6, y + 1.5, x + 0, y + 0.5, x + 0, y + 0.5);

    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.6,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.25,
      bevelThickness: 0.25,
      curveSegments: 32,
    });
    g.center();
    g.rotateZ(Math.PI);
    return g;
  }, []);
  return <primitive object={geo} attach="geometry" />;
}

// Realistic two-beat cardiac curve, period ~1.1s
function heartScale(t: number) {
  const period = 1.1;
  const phase = (t % period) / period;
  const lub = Math.exp(-Math.pow((phase - 0.05) / 0.05, 2)) * 0.16;
  const dub = Math.exp(-Math.pow((phase - 0.22) / 0.06, 2)) * 0.11;
  return 1 + lub + dub;
}

function BeatingHeart({ onPulse }: { onPulse: (intensity: number) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const lastBeatRef = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = heartScale(t);
    if (meshRef.current) {
      meshRef.current.scale.setScalar(s * 0.35);
      meshRef.current.rotation.y = Math.sin(t * 0.25) * 0.08;
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.7 + (s - 1) * 4;
    }
    // detect a pulse peak to release particles
    const intensity = s - 1;
    if (intensity > 0.12 && t - lastBeatRef.current > 0.4) {
      lastBeatRef.current = t;
      onPulse(intensity);
    }
  });

  return (
    <mesh ref={meshRef}>
      <HeartGeometry />
      <meshStandardMaterial
        ref={matRef}
        color="#ff7aa8"
        emissive="#ff3d7f"
        emissiveIntensity={0.8}
        roughness={0.35}
        metalness={0.1}
      />
    </mesh>
  );
}

function CameraDolly({ trigger }: { trigger: boolean }) {
  const startTime = useRef<number | null>(null);
  useFrame((state) => {
    if (!trigger) return;
    if (startTime.current === null) startTime.current = state.clock.getElapsedTime();
    const elapsed = state.clock.getElapsedTime() - startTime.current;
    const t = Math.min(elapsed / 2.6, 1);
    // ease out cubic
    const e = 1 - Math.pow(1 - t, 3);
    const z = 6 + e * 2.2;
    state.camera.position.z = z;
    state.camera.updateProjectionMatrix();
  });
  return null;
}

interface HeartSceneProps {
  onPulse: (intensity: number) => void;
  zoomOut: boolean;
}

export function HeartScene({ onPulse, zoomOut }: HeartSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 6]} intensity={3.5} color="#ffb3c8" />
      <pointLight position={[-4, -3, 4]} intensity={1.8} color="#c89cff" />
      <Suspense fallback={null}>
        <BeatingHeart onPulse={onPulse} />
      </Suspense>
      <CameraDolly trigger={zoomOut} />
      <EffectComposer>
        <Bloom intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.6} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

// suppress unused
export type _ = ThreeElements;