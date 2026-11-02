'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// 1. DIORAMA BASE & ARCHITECTURAL WALLS
// -------------------------------------------------------------
function DioramaRoom() {
  return (
    <group>
      {/* Diorama Platform Floor (Beveled Warm Parquet Base) */}
      <RoundedBox args={[5.2, 0.14, 4.4]} radius={0.05} smoothness={4} position={[0, -1.07, 0]} receiveShadow>
        <meshStandardMaterial color="#1a1c23" roughness={0.6} metalness={0.1} />
      </RoundedBox>

      {/* Warm Natural Wood Flooring Inset */}
      <mesh position={[0, -0.99, 0]} receiveShadow>
        <boxGeometry args={[5.05, 0.02, 4.25]} />
        <meshStandardMaterial color="#2d2218" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Acoustic Slate Rug under Battlestation */}
      <group position={[0, -0.97, 0.15]}>
        <RoundedBox args={[3.6, 0.015, 2.7]} radius={0.06} smoothness={4} receiveShadow>
          <meshStandardMaterial color="#15171e" roughness={0.85} />
        </RoundedBox>
        {/* Subtle Neo-Brutalism Rug Accent Trim */}
        <mesh position={[0, 0.01, -1.25]}>
          <planeGeometry args={[3.4, 0.04]} />
          <meshBasicMaterial color="#FFD60A" />
        </mesh>
        <mesh position={[0, 0.01, 1.25]}>
          <planeGeometry args={[3.4, 0.04]} />
          <meshBasicMaterial color="#2563EB" />
        </mesh>
      </group>

      {/* Corner Back Wall */}
      <mesh position={[0, 0.48, -2.15]} receiveShadow>
        <boxGeometry args={[5.2, 2.96, 0.1]} />
        <meshStandardMaterial color="#181a20" roughness={0.8} />
      </mesh>

      {/* Corner Left Wall */}
      <mesh position={[-2.55, 0.48, 0]} receiveShadow>
        <boxGeometry args={[0.1, 2.96, 4.4]} />
        <meshStandardMaterial color="#14161c" roughness={0.8} />
      </mesh>

      {/* Matte Black Baseboards */}
      <mesh position={[0, -0.94, -2.08]}>
        <boxGeometry args={[5.1, 0.08, 0.03]} />
        <meshStandardMaterial color="#0b0c10" roughness={0.5} />
      </mesh>
      <mesh position={[-2.48, -0.94, 0]}>
        <boxGeometry args={[0.03, 0.08, 4.3]} />
        <meshStandardMaterial color="#0b0c10" roughness={0.5} />
      </mesh>

      {/* Modern Acoustic Vertical Wood Slats (Backdrop Behind Desk) */}
      <group position={[-0.3, 0.5, -2.08]}>
        {[-1.2, -0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.08, 2.7, 0.02]} />
            <meshStandardMaterial color="#3b2b1e" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 2. WALL ACCENTS & FLOATING SHELVES (CLEAN & CURATED)
// -------------------------------------------------------------
function WallAccents() {
  return (
    <group>
      {/* Floating Walnut Display Shelf */}
      <group position={[-0.6, 1.35, -2.02]}>
        <RoundedBox args={[2.0, 0.04, 0.28]} radius={0.015} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color="#453123" roughness={0.4} />
        </RoundedBox>
        {/* Curated Tech Books on Shelf */}
        <group position={[-0.7, 0.12, 0]}>
          <mesh position={[-0.12, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 0.22, 0.18]} />
            <meshStandardMaterial color="#FFD60A" />
          </mesh>
          <mesh position={[-0.04, 0, 0]} castShadow>
            <boxGeometry args={[0.07, 0.25, 0.19]} />
            <meshStandardMaterial color="#2563EB" />
          </mesh>
          <mesh position={[0.05, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.21, 0.17]} />
            <meshStandardMaterial color="#FF4D6D" />
          </mesh>
          <mesh position={[0.13, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.24, 0.18]} />
            <meshStandardMaterial color="#22C55E" />
          </mesh>
        </group>

        {/* Minimalist Golden Robot / Trophy Figurine */}
        <group position={[0.65, 0.1, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.06, 0.04, 16]} />
            <meshStandardMaterial color="#0f1117" />
          </mesh>
          <mesh position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.1, 16]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.16, 0]} castShadow>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Framed Neo-Brutalist Developer Poster */}
      <group position={[1.35, 1.25, -2.08]}>
        {/* Black Poster Frame */}
        <RoundedBox args={[0.95, 1.25, 0.03]} radius={0.01} smoothness={2} castShadow>
          <meshStandardMaterial color="#090a0f" roughness={0.3} />
        </RoundedBox>
        {/* Canvas */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[0.88, 1.18]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
        <Text position={[0, 0.38, 0.025]} fontSize={0.065} color="#FFD60A" fontWeight="bold" anchorX="center">
          BUILD // SCALE
        </Text>
        <Text position={[0, 0.26, 0.025]} fontSize={0.036} color="#94A3B8" anchorX="center">
          AI & Full Stack Systems
        </Text>
        {/* Graphic Accents on Poster */}
        <mesh position={[-0.22, -0.05, 0.025]}>
          <boxGeometry args={[0.28, 0.28, 0.005]} />
          <meshBasicMaterial color="#2563EB" />
        </mesh>
        <mesh position={[0.16, -0.05, 0.025]}>
          <boxGeometry args={[0.28, 0.28, 0.005]} />
          <meshBasicMaterial color="#FF4D6D" />
        </mesh>
        <Text position={[0, -0.38, 0.025]} fontSize={0.032} color="#CBD5E1" anchorX="center">
          FITTO ARDIANSYAH &bull; 2026
        </Text>
      </group>

      {/* Cyber Glow Accent Wall Light Bar */}
      <group position={[-0.6, 1.4, -2.0]}>
        <pointLight position={[0, -0.08, 0.1]} color="#fef08a" intensity={0.4} distance={1.8} />
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 3. MAIN SOLID WALNUT DESK & SIT-STAND LEGS
// -------------------------------------------------------------
function MainDesk() {
  return (
    <group position={[0, -0.28, -0.5]}>
      {/* Chamfered Solid Walnut Tabletop */}
      <RoundedBox args={[3.8, 0.08, 1.9]} radius={0.03} smoothness={4} receiveShadow castShadow>
        <meshStandardMaterial color="#302015" roughness={0.35} metalness={0.05} />
      </RoundedBox>

      {/* Large Premium Stitched Desk Mat */}
      <group position={[-0.05, 0.045, 0.1]}>
        <RoundedBox args={[2.9, 0.012, 1.35]} radius={0.03} smoothness={4} receiveShadow>
          <meshStandardMaterial color="#111319" roughness={0.8} />
        </RoundedBox>
        {/* Yellow Stitched Border Accent */}
        <mesh position={[0, 0.007, 0]}>
          <boxGeometry args={[2.92, 0.002, 1.37]} />
          <meshBasicMaterial color="#FFD60A" />
        </mesh>
      </group>

      {/* Dual Heavy-Duty Motorized Metal Standing Desk Legs */}
      {[-1.6, 1.6].map((x, i) => (
        <group key={i} position={[x, -0.34, 0]}>
          {/* Vertical Telescopic Column */}
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.65, 0.1]} />
            <meshStandardMaterial color="#090a0f" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Floor Foot Bar */}
          <mesh position={[0, -0.32, 0]} castShadow>
            <boxGeometry args={[0.12, 0.04, 1.45]} />
            <meshStandardMaterial color="#090a0f" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* Cable Management Wire Tray (Under Desk) */}
      <mesh position={[0, -0.08, -0.45]}>
        <boxGeometry args={[2.2, 0.06, 0.2]} />
        <meshStandardMaterial color="#090a0f" metalness={0.7} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 4. DUAL MONITORS & INTERACTIVE CODE SCREEN
// -------------------------------------------------------------
const SCREEN_MODES = [
  {
    title: 'vision_pipeline.py — AI Computer Vision',
    badge: '● YOLOv8 + PyTorch Active',
    badgeColor: '#22C55E',
    code: [
      'import torch, cv2',
      'from ultralytics import YOLO',
      'model = YOLO("fitto_vision_ai.pt")',
      'results = model.track(source=0, conf=0.85)',
      '# [AI INFERENCE] 11ms latency | 60 FPS',
      '# Accuracy: 98.7% | Precision: 99.1%',
    ],
  },
  {
    title: 'page.tsx — Next.js Full Stack App',
    badge: '● Production Build 200 OK',
    badgeColor: '#2563EB',
    code: [
      'export default async function App() {',
      '  const aiEngine = await initEngine();',
      '  const stream = aiEngine.predictStream();',
      '  return <Dashboard data={stream} />;',
      '}',
      '// Deployed at edge: 14ms latency',
    ],
  },
  {
    title: 'train_neural_net.sh — GPU Cluster',
    badge: '● Epoch 94/100 [Loss: 0.008]',
    badgeColor: '#FFD60A',
    code: [
      '$ python -m torch.distributed.launch',
      'CUDA_VISIBLE_DEVICES=0,1 train.py',
      'Epoch 94/100: [=========>] 94% complete',
      'val_loss: 0.0084 | top1_acc: 98.4%',
      'Checkpoints saved to /models/best.pth',
      'Status: Training converged successfully',
    ],
  },
];

function MonitorSetup() {
  const [modeIndex, setModeIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef<THREE.Mesh>(null);
  const barsRef = useRef<THREE.Group>(null);
  const currentMode = SCREEN_MODES[modeIndex];

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.45 + Math.sin(state.clock.elapsedTime * 2.5) * 0.06;
    }
    if (barsRef.current) {
      barsRef.current.children.forEach((child, i) => {
        const h = 0.15 + Math.sin(state.clock.elapsedTime * 3 + i * 1.2) * 0.08;
        child.scale.y = Math.max(0.2, h);
      });
    }
  });

  return (
    <group position={[0, -0.24, -0.5]}>
      {/* Dual Heavy Monitor Arm Mount at Back Desk Edge */}
      <mesh position={[-0.1, 0.12, -0.65]} castShadow>
        <boxGeometry args={[0.18, 0.32, 0.14]} />
        <meshStandardMaterial color="#090a0f" metalness={0.9} />
      </mesh>
      <mesh position={[-0.1, 0.42, -0.6]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.45, 16]} />
        <meshStandardMaterial color="#090a0f" metalness={0.9} />
      </mesh>

      {/* PRIMARY CURVED ULTRAWIDE MONITOR (CENTER) */}
      <group position={[-0.1, 0.72, -0.42]}>
        {/* Slim Monitor Chassis */}
        <RoundedBox args={[2.5, 1.35, 0.06]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#090a0f" metalness={0.7} roughness={0.3} />
        </RoundedBox>

        {/* Minimalist Screenbar Light Bar on Top */}
        <group position={[0, 0.71, 0.03]}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.035, 0.05]} />
            <meshStandardMaterial color="#18181b" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.018, 0.01]}>
            <boxGeometry args={[1.4, 0.008, 0.02]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <pointLight position={[0, -0.05, 0.08]} color="#fef08a" intensity={0.65} distance={1.6} />
        </group>

        {/* Clickable Interactive Screen */}
        <mesh
          ref={screenRef}
          position={[0, 0, 0.035]}
          onClick={() => setModeIndex((prev) => (prev + 1) % SCREEN_MODES.length)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[2.4, 1.25]} />
          <meshStandardMaterial
            color="#030712"
            emissive={hovered ? '#1e3a8a' : '#0f172a'}
            emissiveIntensity={0.45}
          />
        </mesh>

        {/* Window Title Bar */}
        <mesh position={[0, 0.52, 0.045]}>
          <planeGeometry args={[2.38, 0.12]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        {/* macOS Traffic Lights */}
        <mesh position={[-1.08, 0.52, 0.05]}>
          <circleGeometry args={[0.022, 16]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        <mesh position={[-1.01, 0.52, 0.05]}>
          <circleGeometry args={[0.022, 16]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>
        <mesh position={[-0.94, 0.52, 0.05]}>
          <circleGeometry args={[0.022, 16]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
        <Text position={[-0.85, 0.52, 0.05]} fontSize={0.052} color="#94A3B8" anchorX="left" anchorY="middle">
          {currentMode.title}
        </Text>
        <Text position={[0.78, 0.52, 0.05]} fontSize={0.044} color={currentMode.badgeColor} anchorX="center" anchorY="middle" fontWeight="bold">
          {currentMode.badge}
        </Text>

        {/* Code Lines */}
        {currentMode.code.map((line, i) => (
          <Text
            key={i}
            position={[-1.1, 0.34 - i * 0.11, 0.05]}
            fontSize={0.062}
            color={
              i === 0 ? '#FFD60A' : i === 1 ? '#38BDF8' : i === 2 ? '#F472B6' : i === 3 ? '#4ADE80' : '#E2E8F0'
            }
            anchorX="left"
            anchorY="middle"
          >
            {line}
          </Text>
        ))}

        {/* Click Mode Hint */}
        <Text position={[0, -0.5, 0.05]} fontSize={0.042} color={hovered ? '#FFD60A' : '#64748B'} anchorX="center">
          {hovered ? '✦ Click to Switch Mode ✦' : 'Click screen to toggle AI / Web / GPU modes'}
        </Text>
      </group>

      {/* SECONDARY VERTICAL MONITOR (LEFT SIDE, TELEMETRY) */}
      <group position={[-1.6, 0.74, -0.22]} rotation={[0, 0.36, 0]}>
        <RoundedBox args={[0.95, 1.5, 0.06]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#090a0f" metalness={0.7} />
        </RoundedBox>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.88, 1.42]} />
          <meshStandardMaterial color="#020617" emissive="#064e3b" emissiveIntensity={0.35} />
        </mesh>
        <Text position={[0, 0.6, 0.045]} fontSize={0.052} color="#34D399" anchorX="center" fontWeight="bold">
          AI TELEMETRY
        </Text>
        <Text position={[-0.38, 0.46, 0.045]} fontSize={0.038} color="#94A3B8" anchorX="left">
          GPU: RTX 4090
        </Text>
        <Text position={[-0.38, 0.38, 0.045]} fontSize={0.038} color="#F59E0B" anchorX="left">
          VRAM: 18.2 / 24 GB
        </Text>
        {/* Animated Bar Graph */}
        <group ref={barsRef} position={[0, 0.08, 0.045]}>
          {[-0.28, -0.14, 0, 0.14, 0.28].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <boxGeometry args={[0.06, 0.8, 0.01]} />
              <meshStandardMaterial
                color={i === 2 ? '#22C55E' : '#38BDF8'}
                emissive={i === 2 ? '#22C55E' : '#38BDF8'}
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}
        </group>
        <Text position={[0, -0.16, 0.045]} fontSize={0.036} color="#A7F3D0" anchorX="center">
          Validation Acc:
        </Text>
        <Text position={[0, -0.24, 0.045]} fontSize={0.06} color="#FFFFFF" anchorX="center" fontWeight="bold">
          98.7%
        </Text>
        <Text position={[0, -0.42, 0.045]} fontSize={0.038} color="#4ADE80" anchorX="center">
          ● ALL NODES OK
        </Text>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 5. BATTLESTATION GEAR: PC CASE & STUDIO MONITORS
// -------------------------------------------------------------
function BattlestationGear() {
  const fanRef1 = useRef<THREE.Group>(null);
  const fanRef2 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (fanRef1.current) fanRef1.current.rotation.z += delta * 5;
    if (fanRef2.current) fanRef2.current.rotation.z += delta * 5;
  });

  return (
    <group position={[0, -0.24, -0.5]}>
      {/* High-End Tempered Glass PC Case (Right Desk Edge) */}
      <group position={[1.35, 0.52, -0.25]} rotation={[0, -0.18, 0]}>
        {/* Case Body */}
        <RoundedBox args={[0.55, 1.0, 1.1]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#0c0a09" metalness={0.75} roughness={0.25} />
        </RoundedBox>
        {/* Glass Side Panel */}
        <mesh position={[-0.28, 0.04, 0]}>
          <planeGeometry args={[0.96, 0.85]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.3} roughness={0.1} />
        </mesh>
        {/* Illuminated GPU */}
        <mesh position={[-0.14, -0.14, 0.05]} castShadow>
          <boxGeometry args={[0.12, 0.16, 0.58]} />
          <meshStandardMaterial color="#27272a" metalness={0.8} />
        </mesh>
        <mesh position={[-0.21, -0.14, 0.05]}>
          <planeGeometry args={[0.45, 0.04]} />
          <meshStandardMaterial color="#FF4D6D" emissive="#FF4D6D" emissiveIntensity={0.8} />
        </mesh>
        {/* Dual Spinning RGB Ring Fans */}
        <group position={[-0.08, 0.16, 0.48]} rotation={[0, Math.PI / 2, 0]}>
          <group ref={fanRef1}>
            <mesh>
              <torusGeometry args={[0.13, 0.018, 16, 24]} />
              <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.8} />
            </mesh>
          </group>
        </group>
        <group position={[-0.08, -0.16, 0.48]} rotation={[0, Math.PI / 2, 0]}>
          <group ref={fanRef2}>
            <mesh>
              <torusGeometry args={[0.13, 0.018, 16, 24]} />
              <meshStandardMaterial color="#FFD60A" emissive="#FFD60A" emissiveIntensity={0.8} />
            </mesh>
          </group>
        </group>
        <pointLight position={[-0.1, 0.1, 0]} color="#FF4D6D" intensity={0.4} distance={1.2} />
      </group>

      {/* Studio Speakers (KRK Style with Iconic Yellow Cones) */}
      {/* Left Speaker */}
      <group position={[-1.75, 0.28, -0.72]} rotation={[0, 0.32, 0]} castShadow>
        <RoundedBox args={[0.34, 0.52, 0.36]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#18181b" roughness={0.45} />
        </RoundedBox>
        <mesh position={[0, -0.06, 0.185]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 24]} />
          <meshStandardMaterial color="#FFD60A" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.12, 0.185]}>
          <cylinderGeometry args={[0.04, 0.04, 0.015, 24]} />
          <meshStandardMaterial color="#090a0f" roughness={0.2} />
        </mesh>
      </group>

      {/* Right Speaker */}
      <group position={[0.82, 0.28, -0.72]} rotation={[0, -0.22, 0]} castShadow>
        <RoundedBox args={[0.34, 0.52, 0.36]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#18181b" roughness={0.45} />
        </RoundedBox>
        <mesh position={[0, -0.06, 0.185]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 24]} />
          <meshStandardMaterial color="#FFD60A" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.12, 0.185]}>
          <cylinderGeometry args={[0.04, 0.04, 0.015, 24]} />
          <meshStandardMaterial color="#090a0f" roughness={0.2} />
        </mesh>
      </group>

      {/* Focusrite Scarlett Audio Interface (Red Box with Silver Dials) */}
      <group position={[0.78, 0.04, -0.38]} rotation={[0, -0.15, 0]}>
        <RoundedBox args={[0.32, 0.09, 0.24]} radius={0.015} smoothness={4} castShadow>
          <meshStandardMaterial color="#b91c1c" metalness={0.65} roughness={0.3} />
        </RoundedBox>
        {/* Silver Volume Knob */}
        <mesh position={[0.07, 0.01, 0.125]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 6. DESK PERIPHERALS & CURATED ACCESSORIES
// -------------------------------------------------------------
function DeskPeripherals() {
  const steamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.children.forEach((child, i) => {
        child.position.y = 0.16 + Math.sin(state.clock.elapsedTime * 2.2 + i * 1.5) * 0.05;
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.12;
      });
    }
  });

  return (
    <group position={[0, -0.24, -0.5]}>
      {/* Custom 75% Mechanical Keyboard */}
      <group position={[-0.15, 0.065, 0.18]} rotation={[-0.04, 0, 0]}>
        <RoundedBox args={[1.2, 0.04, 0.44]} radius={0.018} smoothness={4} castShadow>
          <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        {/* Keycaps Bed */}
        <mesh position={[0, 0.024, 0]}>
          <boxGeometry args={[1.12, 0.015, 0.38]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
        </mesh>
        {/* Accent Keycaps (Pink Esc, Yellow Enter, Blue Space) */}
        <mesh position={[-0.5, 0.038, -0.14]}>
          <boxGeometry args={[0.07, 0.02, 0.07]} />
          <meshStandardMaterial color="#FF4D6D" />
        </mesh>
        <mesh position={[0.48, 0.038, 0.02]}>
          <boxGeometry args={[0.1, 0.02, 0.07]} />
          <meshStandardMaterial color="#FFD60A" />
        </mesh>
        <mesh position={[0, 0.038, 0.14]}>
          <boxGeometry args={[0.4, 0.02, 0.07]} />
          <meshStandardMaterial color="#2563EB" />
        </mesh>
        {/* Coiled Cyan Keyboard Cable */}
        <mesh position={[-0.15, 0.015, -0.26]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.28, 12]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Wireless Ergonomic Mouse */}
      <group position={[0.72, 0.065, 0.18]} rotation={[0, -0.06, 0]} castShadow>
        <RoundedBox args={[0.2, 0.055, 0.32]} radius={0.035} smoothness={6}>
          <meshStandardMaterial color="#090a0f" roughness={0.35} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0.03, -0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.035, 16]} />
          <meshStandardMaterial color="#FFD60A" />
        </mesh>
      </group>

      {/* Minimalist Aluminum Headphone Stand with Over-Ear Cans */}
      <group position={[-1.25, 0.05, 0.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.025, 24]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.36, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Headband & Earcups */}
        <mesh position={[0, 0.36, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.13, 0.02, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[-0.13, 0.23, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
        <mesh position={[0.13, 0.23, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
      </group>

      {/* Ceramic Coffee Mug with Rising Steam */}
      <group position={[0.85, 0.05, 0.38]}>
        {/* Coaster */}
        <mesh position={[0, 0.005, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.01, 24]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
        {/* Yellow Mug */}
        <mesh position={[0, 0.11, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.085, 0.2, 24]} />
          <meshStandardMaterial color="#FFD60A" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.19, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.015, 24]} />
          <meshStandardMaterial color="#2d1606" roughness={0.1} />
        </mesh>
        <mesh position={[0.1, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.055, 0.018, 12, 24]} />
          <meshStandardMaterial color="#FFD60A" />
        </mesh>
        {/* Steam */}
        <group ref={steamRef} position={[0, 0.2, 0]}>
          {[0, 0.03, -0.03].map((x, i) => (
            <mesh key={i} position={[x, 0.15, 0]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.25} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Geometric Concrete Pot with Succulent */}
      <group position={[-0.8, 0.05, -0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.12, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <dodecahedronGeometry args={[0.075]} />
          <meshStandardMaterial color="#22c55e" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 7. ERGONOMIC MESH CHAIR (TUCKED NEATLY, CLEAN ANGLE)
// -------------------------------------------------------------
function ErgonomicChair() {
  return (
    <group position={[0, -0.38, 0.52]} rotation={[0, -0.16, 0]}>
      {/* 5-Star Caster Wheel Base */}
      <group position={[0, -0.56, 0]}>
        <mesh>
          <cylinderGeometry args={[0.035, 0.035, 0.28, 16]} />
          <meshStandardMaterial color="#090a0f" metalness={0.8} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh position={[0.22, -0.1, 0]}>
                <boxGeometry args={[0.42, 0.035, 0.05]} />
                <meshStandardMaterial color="#090a0f" metalness={0.7} />
              </mesh>
              <mesh position={[0.42, -0.13, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Hydraulic Chrome Piston */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.24, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Contoured Seat Pan */}
      <RoundedBox position={[0, -0.18, 0]} args={[0.66, 0.08, 0.62]} radius={0.03} smoothness={4} castShadow>
        <meshStandardMaterial color="#18181b" roughness={0.7} />
      </RoundedBox>

      {/* Breathable Mesh Ergonomic Backrest */}
      <group position={[0, 0.22, -0.28]} rotation={[-0.08, 0, 0]}>
        <RoundedBox args={[0.58, 0.72, 0.05]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#090a0f" roughness={0.75} />
        </RoundedBox>
        {/* Lumbar Cushion */}
        <mesh position={[0, -0.15, 0.035]}>
          <boxGeometry args={[0.38, 0.12, 0.025]} />
          <meshStandardMaterial color="#27272a" />
        </mesh>
        {/* Headrest */}
        <RoundedBox position={[0, 0.46, 0.015]} args={[0.3, 0.14, 0.04]} radius={0.015} smoothness={4}>
          <meshStandardMaterial color="#18181b" roughness={0.7} />
        </RoundedBox>
      </group>

      {/* Left & Right Armrests */}
      {[-0.34, 0.34].map((x, i) => (
        <group key={i} position={[x, -0.02, 0]}>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.24, 8]} />
            <meshStandardMaterial color="#090a0f" />
          </mesh>
          <RoundedBox position={[0, 0.08, 0.03]} args={[0.07, 0.03, 0.28]} radius={0.015} smoothness={4}>
            <meshStandardMaterial color="#27272a" />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

// -------------------------------------------------------------
// 8. TALL CORNER MONSTERA PLANT (ORGANIC WARMTH)
// -------------------------------------------------------------
function CornerPlant() {
  return (
    <group position={[-2.05, -0.65, -1.5]}>
      {/* Fluted Ceramic Pot */}
      <mesh castShadow>
        <cylinderGeometry args={[0.26, 0.2, 0.65, 24]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.35} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.33, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.03, 24]} />
        <meshStandardMaterial color="#271c14" roughness={0.9} />
      </mesh>
      {/* Monstera Stems & Broad Leaves */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5 + 0.3;
        return (
          <group key={i} rotation={[0.22, angle, 0.32]} position={[0, 0.38 + i * 0.08, 0]}>
            <mesh position={[0, 0.28, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.58, 8]} />
              <meshStandardMaterial color="#15803d" />
            </mesh>
            <mesh position={[0, 0.56, 0]} rotation={[0.38, 0, 0]}>
              <boxGeometry args={[0.24, 0.36, 0.008]} />
              <meshStandardMaterial color="#16a34a" roughness={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// -------------------------------------------------------------
// 9. OVERALL SCENE & CAMERA LIGHTING
// -------------------------------------------------------------
function Scene() {
  return (
    <>
      {/* Balanced Studio Ambient Light */}
      <ambientLight intensity={0.65} />

      {/* Main Soft Sun Directional Light */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.05}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Warm Fill Light */}
      <pointLight position={[-3, 4, 3]} intensity={0.45} color="#fef08a" distance={9} />

      {/* Monitor & PC Neon Cyber Radiance */}
      <pointLight position={[-0.1, 0.5, -0.4]} intensity={0.6} color="#38bdf8" distance={3.2} />
      <pointLight position={[1.3, 0.3, -0.5]} intensity={0.5} color="#ec4899" distance={2.4} />

      {/* Assembled Diorama Setup */}
      <DioramaRoom />
      <WallAccents />
      <MainDesk />
      <MonitorSetup />
      <BattlestationGear />
      <DeskPeripherals />
      <ErgonomicChair />
      <CornerPlant />

      {/* Smooth Diorama Orbit Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4.2}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={-Math.PI / 3.4}
        maxAzimuthAngle={Math.PI / 3.4}
        target={[0, 0.05, -0.1]}
      />
    </>
  );
}

export default function DeveloperRoom() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [3.3, 2.3, 3.7], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
