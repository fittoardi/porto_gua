'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

function Desk() {
  return (
    <mesh position={[0, -1.2, 0]} receiveShadow>
      <boxGeometry args={[6, 0.15, 3.5]} />
      <meshStandardMaterial color="#D4A574" />
    </mesh>
  );
}

function Monitor({ position }: { position: [number, number, number] }) {
  const screenRef = useRef<THREE.Mesh>(null);
  const lines = useMemo(
    () => [
      'def train_model():',
      '  model.fit(X, y)',
      '  acc = model.evaluate()',
      '  print(f"acc={acc}")',
      '  return model',
    ],
    []
  );

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Stand */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[1, 0.05, 0.6]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Monitor frame */}
      <RoundedBox args={[2.8, 1.6, 0.1]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[2.6, 1.4]} />
        <meshStandardMaterial
          color="#0a1929"
          emissive="#1e3a5f"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Code lines */}
      {lines.map((line, i) => (
        <Text
          key={i}
          position={[-1.2, 0.4 - i * 0.16, 0.08]}
          fontSize={0.08}
          color={i === 0 ? '#FFD60A' : i === 1 ? '#22C55E' : i === 2 ? '#2563EB' : '#e0e0e0'}
          anchorX="left"
          anchorY="middle"
        >
          {line}
        </Text>
      ))}
    </group>
  );
}

function Laptop({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position}>
        {/* Base */}
        <RoundedBox args={[1.4, 0.06, 1]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#3a3a3a" />
        </RoundedBox>
        {/* Screen */}
        <mesh position={[0, 0.5, -0.47]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[1.4, 0.95, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.5, -0.44]} rotation={[-0.15, 0, 0]}>
          <planeGeometry args={[1.3, 0.85]} />
          <meshStandardMaterial color="#0a1929" emissive="#2563EB" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function Keyboard({ position }: { position: [number, number, number] }) {
  const keys = useMemo(() => {
    const arr: { pos: [number, number, number]; color: string }[] = [];
    const colors = ['#FF4D6D', '#FFD60A', '#22C55E', '#2563EB', '#FFFFFF'];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        arr.push({
          pos: [-0.55 + col * 0.1, 0.02, -0.15 + row * 0.08],
          color: colors[(row + col) % colors.length],
        });
      }
    }
    return arr;
  }, []);

  const keyRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    keyRefs.current.forEach((key, i) => {
      if (key) {
        const mat = key.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity =
          0.3 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.2;
      }
    });
  });

  return (
    <group position={position}>
      <RoundedBox args={[1.3, 0.08, 0.5]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>
      {keys.map((key, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) keyRefs.current[i] = el;
          }}
          position={key.pos}
        >
          <boxGeometry args={[0.07, 0.04, 0.06]} />
          <meshStandardMaterial
            color={key.color}
            emissive={key.color}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function Mouse3D({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, 0, 0.3]}>
      <capsuleGeometry args={[0.1, 0.15, 4, 16]} />
      <meshStandardMaterial color="#111111" />
    </mesh>
  );
}

function CoffeeCup({ position }: { position: [number, number, number] }) {
  const steamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.1 + 0.3;
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2;
      });
    }
  });

  return (
    <group position={position}>
      {/* Cup body */}
      <mesh>
        <cylinderGeometry args={[0.18, 0.15, 0.28, 16]} />
        <meshStandardMaterial color="#FFD60A" />
      </mesh>
      {/* Coffee */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
        <meshStandardMaterial color="#3a1a0a" />
      </mesh>
      {/* Handle */}
      <mesh position={[0.18, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.025, 8, 16]} />
        <meshStandardMaterial color="#FFD60A" />
      </mesh>
      {/* Steam */}
      <group ref={steamRef}>
        {[0, 0.08, -0.08].map((x, i) => (
          <mesh key={i} position={[x, 0.3, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh>
        <cylinderGeometry args={[0.18, 0.14, 0.25, 16]} />
        <meshStandardMaterial color="#FF4D6D" />
      </mesh>
      {/* Leaves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 0.08,
            0.2 + i * 0.04,
            Math.sin((i / 5) * Math.PI * 2) * 0.08,
          ]}
          rotation={[0, (i / 5) * Math.PI * 2, 0.3]}
        >
          <coneGeometry args={[0.06, 0.2, 4]} />
          <meshStandardMaterial color="#22C55E" />
        </mesh>
      ))}
    </group>
  );
}

function Notebook({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.2, 0]}>
      <RoundedBox args={[0.4, 0.04, 0.55]} radius={0.01} smoothness={4}>
        <meshStandardMaterial color="#2563EB" />
      </RoundedBox>
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[0.38, 0.01, 0.53]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function LedLamp({ position }: { position: [number, number, number] }) {
  const ledRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity =
        0.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.04, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* Arm */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Head */}
      <mesh ref={ledRef} position={[0, 0.38, 0]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.12, 0.1, 16]} />
        <meshStandardMaterial
          color="#FFD60A"
          emissive="#FFD60A"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

function TechLogo({
  position,
  label,
  color,
}: {
  position: [number, number, number];
  label: string;
  color: string;
}) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <RoundedBox args={[0.4, 0.4, 0.05]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={color} />
        </RoundedBox>
        <Text
          position={[0, 0, 0.04]}
          fontSize={0.1}
          color="#111111"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#FFD60A" />
      <pointLight position={[3, 2, -2]} intensity={0.3} color="#2563EB" />

      <Desk />
      <Monitor position={[-0.3, 0.2, -0.5]} />
      <Laptop position={[1.8, -1.05, 0.3]} />
      <Keyboard position={[-0.3, -1.08, 0.6]} />
      <Mouse3D position={[0.8, -1.05, 0.7]} />
      <CoffeeCup position={[1.5, -1.0, 0.8]} />
      <Plant position={[-2.5, -1.0, -0.5]} />
      <Notebook position={[2.2, -1.12, 0.9]} />
      <LedLamp position={[-2, -0.85, 0.5]} />

      {/* Floating tech logos */}
      <TechLogo position={[-2.8, 1.5, -1]} label="Py" color="#FFD60A" />
      <TechLogo position={[2.5, 1.8, -0.5]} label="Fl" color="#2563EB" />
      <TechLogo position={[-1.5, 2.2, 0.5]} label="La" color="#FF4D6D" />
      <TechLogo position={[2.8, 0.8, 1]} label="API" color="#22C55E" />
      <TechLogo position={[-2.2, 0.5, 1]} label="Git" color="#111111" />
      <TechLogo position={[1.5, 2.5, 0]} label="VS" color="#2563EB" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
      />
    </>
  );
}

export default function DeveloperRoom() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
