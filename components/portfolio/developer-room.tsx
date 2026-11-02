'use client';

import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// 1. ISOMETRIC ROOM ARCHITECTURE (WALLS, FLOOR, WINDOW, RUG)
// -------------------------------------------------------------
function RoomStructure() {
  return (
    <group>
      {/* Wood Parquet Floor */}
      <mesh position={[0, -1.25, 0]} receiveShadow>
        <boxGeometry args={[6.8, 0.1, 5.8]} />
        <meshStandardMaterial color="#2d1f15" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 0.85, -2.85]} receiveShadow>
        <boxGeometry args={[6.8, 4.1, 0.1]} />
        <meshStandardMaterial color="#1e222d" roughness={0.8} />
      </mesh>
      {/* Back Wall Baseboard */}
      <mesh position={[0, -1.16, -2.78]}>
        <boxGeometry args={[6.8, 0.08, 0.04]} />
        <meshStandardMaterial color="#0f1117" roughness={0.6} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-3.35, 0.85, 0]} receiveShadow>
        <boxGeometry args={[0.1, 4.1, 5.8]} />
        <meshStandardMaterial color="#191c26" roughness={0.8} />
      </mesh>
      {/* Left Wall Baseboard */}
      <mesh position={[-3.28, -1.16, 0]}>
        <boxGeometry args={[0.04, 0.08, 5.8]} />
        <meshStandardMaterial color="#0f1117" roughness={0.6} />
      </mesh>

      {/* Wall Window with Blinds & Soft Sunlight (Left Wall) */}
      <group position={[-3.28, 0.9, -0.6]}>
        {/* Window Frame */}
        <mesh>
          <boxGeometry args={[0.06, 1.8, 1.6]} />
          <meshStandardMaterial color="#090a0f" roughness={0.4} />
        </mesh>
        {/* Sky Glass Pane with Daylight Glow */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.02, 1.65, 1.45]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Window Horizontal Mullions / Blinds */}
        {[-0.5, -0.25, 0, 0.25, 0.5].map((y, i) => (
          <mesh key={i} position={[0.04, y, 0]}>
            <boxGeometry args={[0.03, 0.03, 1.48]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
        ))}
        {/* Window Sill with Mini Succulent */}
        <mesh position={[0.08, -0.92, 0]}>
          <boxGeometry args={[0.16, 0.06, 1.7]} />
          <meshStandardMaterial color="#090a0f" roughness={0.5} />
        </mesh>
      </group>

      {/* Cozy Textured Area Rug under Desk & Chair */}
      <group position={[0.1, -1.19, 0.35]}>
        <RoundedBox args={[3.8, 0.015, 3.2]} radius={0.08} smoothness={4} receiveShadow>
          <meshStandardMaterial color="#222530" roughness={0.9} />
        </RoundedBox>
        {/* Geometric Accent Stripes on Rug */}
        <mesh position={[0, 0.01, -0.6]}>
          <planeGeometry args={[3.4, 0.12]} />
          <meshStandardMaterial color="#FFD60A" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.01, 0.6]}>
          <planeGeometry args={[3.4, 0.12]} />
          <meshStandardMaterial color="#FF4D6D" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 2. WALL DECOR (FLOATING SHELVES, POSTERS, PEGBOARD, NEON)
// -------------------------------------------------------------
function WallDecor() {
  return (
    <group>
      {/* Floating Shelf 1 (Upper) */}
      <group position={[0.3, 1.7, -2.75]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.05, 0.3]} />
          <meshStandardMaterial color="#3d2716" roughness={0.4} />
        </mesh>
        {/* Books with Various Colors */}
        {[-1.0, -0.85, -0.7, -0.55].map((x, i) => (
          <mesh key={i} position={[x, 0.18, 0]}>
            <boxGeometry args={[0.08, 0.32 + (i % 2) * 0.06, 0.22]} />
            <meshStandardMaterial
              color={i === 0 ? '#FFD60A' : i === 1 ? '#2563EB' : i === 2 ? '#FF4D6D' : '#22C55E'}
              roughness={0.6}
            />
          </mesh>
        ))}
        {/* Decorative Sci-Fi Robot Figurine */}
        <group position={[0.2, 0.18, 0]}>
          <RoundedBox args={[0.14, 0.22, 0.14]} radius={0.02} smoothness={4}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          <mesh position={[0, 0.04, 0.075]}>
            <planeGeometry args={[0.09, 0.04]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
        {/* Potted Shelf Ivy Plant */}
        <group position={[0.9, 0.12, 0]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.08, 0.15, 16]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.13, 8, 8]} />
            <meshStandardMaterial color="#15803d" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Floating Shelf 2 (Lower) */}
      <group position={[0.8, 1.25, -2.75]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.05, 0.3]} />
          <meshStandardMaterial color="#3d2716" roughness={0.4} />
        </mesh>
        {/* Smart Clock / Speaker */}
        <group position={[-0.5, 0.1, 0]}>
          <RoundedBox args={[0.3, 0.14, 0.12]} radius={0.02} smoothness={4}>
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </RoundedBox>
          <Text position={[0, 0, 0.065]} fontSize={0.05} color="#38bdf8" fontWeight="bold">
            12:45
          </Text>
        </group>
        {/* Framed Mini Picture */}
        <group position={[0.35, 0.16, -0.05]} rotation={[0, -0.1, 0]}>
          <boxGeometry args={[0.32, 0.24, 0.02]} />
          <meshStandardMaterial color="#000000" />
        </group>
      </group>

      {/* Large Framed AI Neural Network Poster (Back Wall) */}
      <group position={[-1.75, 1.45, -2.78]}>
        {/* Frame */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.5, 0.03]} />
          <meshStandardMaterial color="#090a0f" roughness={0.3} />
        </mesh>
        {/* Poster Canvas */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[1.1, 1.4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
        <Text position={[0, 0.5, 0.025]} fontSize={0.065} color="#FFD60A" fontWeight="bold" anchorX="center">
          NEURAL ARCHITECTURE
        </Text>
        <Text position={[0, 0.36, 0.025]} fontSize={0.038} color="#94A3B8" anchorX="center">
          Deep Vision & Reinforcement Learning
        </Text>
        {/* Diagram Graphic Grid on Poster */}
        {[-0.3, 0, 0.3].map((x, i) => (
          <mesh key={i} position={[x, -0.1, 0.025]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color={i === 1 ? '#38BDF8' : '#F43F5E'} />
          </mesh>
        ))}
      </group>

      {/* Cyberpunk LED Neon Sign on Back Wall */}
      <group position={[1.5, 2.3, -2.78]}>
        <mesh>
          <boxGeometry args={[1.6, 0.32, 0.03]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.6} />
        </mesh>
        <Text position={[0, 0, 0.02]} fontSize={0.09} color="#FF4D6D" fontWeight="bold" anchorX="center" anchorY="middle">
          // FITTO.DEV
        </Text>
        <pointLight position={[0, 0, 0.2]} color="#FF4D6D" intensity={0.6} distance={2.5} />
      </group>

      {/* Modern IKEA Skadis-style Pegboard (Left Wall) */}
      <group position={[-3.28, 1.1, 1.4]} rotation={[0, Math.PI / 2, 0]}>
        <RoundedBox args={[1.3, 1.6, 0.03]} radius={0.02} smoothness={4} castShadow>
          <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
        </RoundedBox>
        {/* Hanging Game Controller */}
        <group position={[-0.25, 0.3, 0.06]}>
          <RoundedBox args={[0.3, 0.18, 0.06]} radius={0.04} smoothness={4}>
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </RoundedBox>
        </group>
        {/* Hanging Coiled Cables */}
        <group position={[0.25, 0.25, 0.04]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.1, 0.02, 12, 24]} />
            <meshStandardMaterial color="#FFD60A" />
          </mesh>
        </group>
        {/* Pegboard Mini Shelf */}
        <mesh position={[0, -0.3, 0.08]}>
          <boxGeometry args={[0.8, 0.03, 0.14]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 3. MAIN DESK & ALEX-STYLE DRAWER STORAGE UNIT
// -------------------------------------------------------------
function DeskAndStorage() {
  return (
    <group position={[-0.1, -0.35, -1.0]}>
      {/* Matte Dark Walnut Tabletop */}
      <RoundedBox args={[4.4, 0.1, 2.2]} radius={0.04} smoothness={4} receiveShadow castShadow>
        <meshStandardMaterial color="#26262b" roughness={0.4} metalness={0.15} />
      </RoundedBox>

      {/* Large Felt & Leather Desk Pad with Yellow Stitching */}
      <mesh position={[0, 0.055, 0.15]} receiveShadow>
        <boxGeometry args={[3.4, 0.015, 1.6]} />
        <meshStandardMaterial color="#121217" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.06, 0.15]}>
        <boxGeometry args={[3.44, 0.005, 1.64]} />
        <meshStandardMaterial color="#FFD60A" roughness={0.3} />
      </mesh>

      {/* Left Motorized Metal Leg Frame */}
      <group position={[-1.85, -0.45, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#090a0f" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.12, 0.04, 1.6]} />
          <meshStandardMaterial color="#090a0f" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Right Under-Desk Drawer Unit (IKEA Alex style) */}
      <group position={[1.65, -0.45, 0]}>
        {/* Cabinet Shell */}
        <RoundedBox args={[0.85, 0.82, 1.8]} radius={0.02} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color="#18181b" roughness={0.5} />
        </RoundedBox>
        {/* Drawer Front Plates & Silver Bar Handles */}
        {[-0.26, 0, 0.26].map((y, i) => (
          <group key={i} position={[0, y, 0.91]}>
            <mesh>
              <boxGeometry args={[0.8, 0.22, 0.01]} />
              <meshStandardMaterial color="#27272a" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <boxGeometry args={[0.24, 0.02, 0.02]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 4. DUAL MONITORS & BENQ SCREENBAR LIGHT
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

function MonitorSetup({ position }: { position: [number, number, number] }) {
  const [modeIndex, setModeIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef<THREE.Mesh>(null);
  const barsRef = useRef<THREE.Group>(null);
  const currentMode = SCREEN_MODES[modeIndex];

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.45 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
    }
    if (barsRef.current) {
      barsRef.current.children.forEach((child, i) => {
        const h = 0.15 + Math.sin(state.clock.elapsedTime * 3 + i * 1.2) * 0.08;
        child.scale.y = Math.max(0.2, h);
      });
    }
  });

  return (
    <group position={position}>
      {/* Heavy-Duty Dual Monitor Desk Clamp on Back Edge */}
      <mesh position={[-0.1, -0.22, -0.68]} castShadow>
        <boxGeometry args={[0.24, 0.4, 0.18]} />
        <meshStandardMaterial color="#090a0f" metalness={0.8} />
      </mesh>
      <mesh position={[-0.1, 0.18, -0.62]} rotation={[0.08, 0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.75, 16]} />
        <meshStandardMaterial color="#090a0f" metalness={0.8} />
      </mesh>

      {/* PRIMARY ULTRAWIDE MONITOR (CENTER) */}
      <group position={[-0.1, 0.5, -0.45]}>
        {/* Chassis */}
        <RoundedBox args={[2.7, 1.45, 0.09]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial color="#090a0f" metalness={0.6} roughness={0.3} />
        </RoundedBox>

        {/* Screenbar Light Mounted on Top of Monitor */}
        <group position={[0, 0.77, 0.04]}>
          <mesh castShadow>
            <boxGeometry args={[1.6, 0.04, 0.06]} />
            <meshStandardMaterial color="#18181b" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.02, 0]}>
            <boxGeometry args={[1.5, 0.01, 0.03]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <pointLight position={[0, -0.06, 0.1]} color="#fef08a" intensity={0.7} distance={1.8} />
        </group>

        {/* Clickable Interactive Screen */}
        <mesh
          ref={screenRef}
          position={[0, 0, 0.05]}
          onClick={() => setModeIndex((prev) => (prev + 1) % SCREEN_MODES.length)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[2.58, 1.34]} />
          <meshStandardMaterial
            color="#030712"
            emissive={hovered ? '#1e3a8a' : '#0f172a'}
            emissiveIntensity={0.45}
          />
        </mesh>

        {/* Window Title Bar */}
        <mesh position={[0, 0.56, 0.06]}>
          <planeGeometry args={[2.56, 0.14]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        {/* macOS Dots */}
        <mesh position={[-1.16, 0.56, 0.07]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        <mesh position={[-1.08, 0.56, 0.07]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>
        <mesh position={[-1.0, 0.56, 0.07]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
        <Text position={[-0.9, 0.56, 0.07]} fontSize={0.055} color="#94A3B8" anchorX="left" anchorY="middle">
          {currentMode.title}
        </Text>
        <Text position={[0.85, 0.56, 0.07]} fontSize={0.046} color={currentMode.badgeColor} anchorX="center" anchorY="middle" fontWeight="bold">
          {currentMode.badge}
        </Text>

        {/* Code Content */}
        {currentMode.code.map((line, i) => (
          <Text
            key={i}
            position={[-1.18, 0.36 - i * 0.115, 0.07]}
            fontSize={0.064}
            color={
              i === 0 ? '#FFD60A' : i === 1 ? '#38BDF8' : i === 2 ? '#F472B6' : i === 3 ? '#4ADE80' : '#E2E8F0'
            }
            anchorX="left"
            anchorY="middle"
          >
            {line}
          </Text>
        ))}

        {/* Interactive Mode Prompt */}
        <Text position={[0, -0.54, 0.07]} fontSize={0.044} color={hovered ? '#FFD60A' : '#64748B'} anchorX="center">
          {hovered ? '✦ Click to Switch Mode ✦' : 'Click monitor to toggle AI / Web / Training modes'}
        </Text>
      </group>

      {/* SECONDARY VERTICAL MONITOR (TELEMETRY & NEURAL METRICS) */}
      <group position={[-1.8, 0.55, -0.22]} rotation={[0, 0.35, 0]}>
        <RoundedBox args={[1.05, 1.65, 0.08]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#090a0f" metalness={0.6} />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[0.96, 1.55]} />
          <meshStandardMaterial color="#020617" emissive="#064e3b" emissiveIntensity={0.35} />
        </mesh>
        <Text position={[0, 0.68, 0.055]} fontSize={0.058} color="#34D399" anchorX="center" fontWeight="bold">
          AI TELEMETRY
        </Text>
        <Text position={[-0.4, 0.52, 0.06]} fontSize={0.042} color="#94A3B8" anchorX="left">
          GPU: RTX 4090
        </Text>
        <Text position={[-0.4, 0.44, 0.06]} fontSize={0.042} color="#F59E0B" anchorX="left">
          VRAM: 18.2 / 24 GB
        </Text>
        {/* Real-time Loss Rate Bar Graph */}
        <group ref={barsRef} position={[0, 0.12, 0.055]}>
          {[-0.32, -0.16, 0, 0.16, 0.32].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <boxGeometry args={[0.07, 1, 0.01]} />
              <meshStandardMaterial
                color={i === 2 ? '#22C55E' : '#38BDF8'}
                emissive={i === 2 ? '#22C55E' : '#38BDF8'}
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}
        </group>
        <Text position={[0, -0.15, 0.06]} fontSize={0.04} color="#A7F3D0" anchorX="center">
          Validation Acc:
        </Text>
        <Text position={[0, -0.23, 0.06]} fontSize={0.065} color="#FFFFFF" anchorX="center" fontWeight="bold">
          98.7%
        </Text>
        <Text position={[0, -0.45, 0.055]} fontSize={0.042} color="#4ADE80" anchorX="center">
          ● ALL NODES OK
        </Text>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 5. RGB LIQUID-COOLED PC, AUDIO SETUP & MICROPHONE BOOM ARM
// -------------------------------------------------------------
function Equipment() {
  const fanRef1 = useRef<THREE.Group>(null);
  const fanRef2 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (fanRef1.current) fanRef1.current.rotation.z += delta * 6;
    if (fanRef2.current) fanRef2.current.rotation.z += delta * 6;
  });

  return (
    <group>
      {/* High-End Gaming PC Case (Right side of Desk) */}
      <group position={[1.45, 0.28, -0.9]} rotation={[0, -0.25, 0]}>
        <RoundedBox args={[0.65, 1.15, 1.25]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#0c0a09" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Tempered Glass Window */}
        <mesh position={[-0.33, 0.05, 0]}>
          <planeGeometry args={[1.1, 0.95]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.35} roughness={0.1} />
        </mesh>
        {/* GPU Strip */}
        <mesh position={[-0.18, -0.15, 0.05]} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.65]} />
          <meshStandardMaterial color="#27272a" metalness={0.8} />
        </mesh>
        <mesh position={[-0.26, -0.15, 0.05]}>
          <planeGeometry args={[0.5, 0.05]} />
          <meshStandardMaterial color="#FF4D6D" emissive="#FF4D6D" emissiveIntensity={0.8} />
        </mesh>
        {/* Dual Rotating RGB Fans */}
        <group position={[-0.12, 0.18, 0.55]} rotation={[0, Math.PI / 2, 0]}>
          <group ref={fanRef1}>
            <mesh>
              <torusGeometry args={[0.15, 0.02, 16, 24]} />
              <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.8} />
            </mesh>
          </group>
        </group>
        <group position={[-0.12, -0.2, 0.55]} rotation={[0, Math.PI / 2, 0]}>
          <group ref={fanRef2}>
            <mesh>
              <torusGeometry args={[0.15, 0.02, 16, 24]} />
              <meshStandardMaterial color="#FFD60A" emissive="#FFD60A" emissiveIntensity={0.8} />
            </mesh>
          </group>
        </group>
        <pointLight position={[-0.15, 0.1, 0]} color="#FF4D6D" intensity={0.4} distance={1.2} />
      </group>

      {/* Studio Speakers (Left & Right with Yellow Kevlar Cones) */}
      <group position={[-2.15, 0.05, -1.2]} rotation={[0, 0.35, 0]} castShadow>
        <RoundedBox args={[0.38, 0.6, 0.42]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#18181b" roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, -0.08, 0.22]}>
          <cylinderGeometry args={[0.12, 0.12, 0.02, 24]} />
          <meshStandardMaterial color="#FFD60A" roughness={0.3} />
        </mesh>
      </group>
      <group position={[0.85, 0.05, -1.35]} rotation={[0, -0.25, 0]} castShadow>
        <RoundedBox args={[0.38, 0.6, 0.42]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#18181b" roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, -0.08, 0.22]}>
          <cylinderGeometry args={[0.12, 0.12, 0.02, 24]} />
          <meshStandardMaterial color="#FFD60A" roughness={0.3} />
        </mesh>
      </group>

      {/* Focusrite Scarlett Audio Interface (Red Box) */}
      <group position={[0.85, -0.25, -0.75]} rotation={[0, -0.15, 0]}>
        <RoundedBox args={[0.35, 0.1, 0.28]} radius={0.02} smoothness={4} castShadow>
          <meshStandardMaterial color="#b91c1c" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        {/* Silver Volume Knob */}
        <mesh position={[0.08, 0.01, 0.145]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
        </mesh>
      </group>

      {/* Podcast/Streamer Microphone on Articulated Boom Arm */}
      <group position={[-1.4, -0.25, -0.6]}>
        {/* Base Clamp */}
        <mesh>
          <boxGeometry args={[0.08, 0.12, 0.08]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
        {/* Lower Arm */}
        <mesh position={[0.15, 0.3, 0.1]} rotation={[-0.3, 0.2, -0.5]}>
          <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[0.35, 0.55, 0.25]} rotation={[0.4, 0.1, -0.2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
        {/* Microphone Body + Pop Filter */}
        <group position={[0.48, 0.52, 0.35]} rotation={[0.3, -0.4, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.16, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
          {/* Circular Pop Filter */}
          <mesh position={[0, -0.04, 0.1]}>
            <circleGeometry args={[0.065, 16]} />
            <meshStandardMaterial color="#090a0f" opacity={0.6} transparent />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 6. ERGONOMIC DEVELOPER CHAIR (HERMAN MILLER MESH STYLE)
// -------------------------------------------------------------
function ErgonomicChair({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -0.15, 0]} castShadow>
      {/* 5-Star Wheel Base */}
      <group position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.35, 16]} />
        <meshStandardMaterial color="#090a0f" metalness={0.8} />
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh position={[0.26, -0.12, 0]}>
                <boxGeometry args={[0.5, 0.04, 0.06]} />
                <meshStandardMaterial color="#090a0f" metalness={0.7} />
              </mesh>
              {/* Castor Wheel */}
              <mesh position={[0.48, -0.16, 0]}>
                <sphereGeometry args={[0.035, 8, 8]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Hydraulic Center Column */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.3, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Contoured Seat Cushion */}
      <RoundedBox position={[0, -0.22, 0]} args={[0.72, 0.1, 0.68]} radius={0.04} smoothness={4} castShadow>
        <meshStandardMaterial color="#18181b" roughness={0.7} />
      </RoundedBox>

      {/* Breathable Mesh High Backrest */}
      <group position={[0, 0.28, -0.32]} rotation={[-0.1, 0, 0]}>
        <RoundedBox args={[0.64, 0.82, 0.06]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial color="#090a0f" roughness={0.8} />
        </RoundedBox>
        {/* Lumbar Support Pad */}
        <mesh position={[0, -0.18, 0.04]}>
          <boxGeometry args={[0.42, 0.14, 0.03]} />
          <meshStandardMaterial color="#27272a" />
        </mesh>
        {/* Headrest */}
        <RoundedBox position={[0, 0.52, 0.02]} args={[0.34, 0.16, 0.05]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#18181b" roughness={0.7} />
        </RoundedBox>
      </group>

      {/* Left & Right 3D Armrests */}
      <group position={[-0.38, 0, 0]}>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
        <RoundedBox position={[0, 0.1, 0.04]} args={[0.08, 0.04, 0.32]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#27272a" />
        </RoundedBox>
      </group>
      <group position={[0.38, 0, 0]}>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
        <RoundedBox position={[0, 0.1, 0.04]} args={[0.08, 0.04, 0.32]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#27272a" />
        </RoundedBox>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 7. DESK ACCESSORIES (KEYBOARD, MOUSE, COFFEE, HEADPHONES)
// -------------------------------------------------------------
function DeskAccessories() {
  const steamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.children.forEach((child, i) => {
        child.position.y = 0.22 + Math.sin(state.clock.elapsedTime * 2.2 + i * 1.5) * 0.08;
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.15;
      });
    }
  });

  return (
    <group position={[-0.1, -0.3, -1.0]}>
      {/* Custom Mechanical Keyboard with Brutalist Keycaps */}
      <group position={[-0.2, 0.06, 0.35]} rotation={[-0.04, 0, 0]}>
        <RoundedBox args={[1.35, 0.05, 0.48]} radius={0.02} smoothness={4} castShadow>
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.2} />
        </RoundedBox>
        {/* Keycaps Grid */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[1.25, 0.02, 0.42]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        {/* Accent Keycaps (Esc Pink, Enter Yellow, Spacebar Blue) */}
        <mesh position={[-0.56, 0.045, -0.16]}>
          <boxGeometry args={[0.08, 0.025, 0.08]} />
          <meshStandardMaterial color="#FF4D6D" />
        </mesh>
        <mesh position={[0.54, 0.045, 0.02]}>
          <boxGeometry args={[0.12, 0.025, 0.08]} />
          <meshStandardMaterial color="#FFD60A" />
        </mesh>
        <mesh position={[0, 0.045, 0.16]}>
          <boxGeometry args={[0.45, 0.025, 0.08]} />
          <meshStandardMaterial color="#2563EB" />
        </mesh>
        {/* Coiled Aviator Keyboard Cable */}
        <mesh position={[-0.2, 0.02, -0.3]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 12]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Ergonomic Wireless Mouse */}
      <group position={[0.85, 0.06, 0.35]} rotation={[0, -0.06, 0]} castShadow>
        <RoundedBox args={[0.22, 0.065, 0.36]} radius={0.04} smoothness={6}>
          <meshStandardMaterial color="#090a0f" roughness={0.3} metalness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.035, -0.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.04, 16]} />
          <meshStandardMaterial color="#FFD60A" />
        </mesh>
      </group>

      {/* Omega Headphone Stand with Over-Ear Headphones */}
      <group position={[-1.7, 0.06, -0.1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.03, 24]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.44, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Headband & Earcups */}
        <mesh position={[0, 0.44, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.16, 0.025, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[-0.16, 0.28, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
        <mesh position={[0.16, 0.28, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          <meshStandardMaterial color="#090a0f" />
        </mesh>
      </group>

      {/* Hot Coffee Ceramic Mug with Steam */}
      <group position={[1.1, 0.06, 0.05]}>
        {/* Cork Coaster */}
        <mesh position={[0, 0.005, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.01, 24]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
        {/* Mug */}
        <mesh position={[0, 0.14, 0]} castShadow>
          <cylinderGeometry args={[0.13, 0.11, 0.26, 24]} />
          <meshStandardMaterial color="#FFD60A" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.115, 0.115, 0.02, 24]} />
          <meshStandardMaterial color="#2d1606" roughness={0.1} />
        </mesh>
        <mesh position={[0.14, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.07, 0.022, 12, 24]} />
          <meshStandardMaterial color="#FFD60A" />
        </mesh>
        {/* Animated Rising Steam */}
        <group ref={steamRef} position={[0, 0.26, 0]}>
          {[0, 0.05, -0.05].map((x, i) => (
            <mesh key={i} position={[x, 0.2, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Open Developer Notebook with Pen */}
      <group position={[-1.15, 0.06, 0.35]} rotation={[0, 0.18, 0]}>
        <RoundedBox args={[0.42, 0.03, 0.55]} radius={0.01} smoothness={4} castShadow>
          <meshStandardMaterial color="#2563EB" roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.4, 0.01, 0.52]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>
        {/* Ballpoint Pen */}
        <mesh position={[0.08, 0.035, 0]} rotation={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.44, 8]} />
          <meshStandardMaterial color="#090a0f" metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 8. ROOM LIFESTYLE CLUTTER (MONSTERA PLANT, SKATEBOARD, BIN)
// -------------------------------------------------------------
function RoomLifestyleClutter() {
  return (
    <group>
      {/* Tall Corner Monstera / Ficus Plant in Ceramic Pot */}
      <group position={[-2.7, -0.85, -2.2]}>
        {/* Pot */}
        <mesh castShadow>
          <cylinderGeometry args={[0.34, 0.26, 0.75, 24]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.31, 0.31, 0.04, 24]} />
          <meshStandardMaterial color="#271c14" roughness={0.9} />
        </mesh>
        {/* Stems & Broad Tropical Leaves */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI * 2) / 6;
          return (
            <group key={i} rotation={[0.2, angle, 0.35]} position={[0, 0.45 + i * 0.12, 0]}>
              <mesh position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 0.7, 8]} />
                <meshStandardMaterial color="#166534" />
              </mesh>
              {/* Leaf Blade */}
              <mesh position={[0, 0.7, 0]} rotation={[0.4, 0, 0]}>
                <boxGeometry args={[0.28, 0.42, 0.01]} />
                <meshStandardMaterial color="#15803d" roughness={0.6} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Skateboard Leaning against Left Wall */}
      <group position={[-3.15, -0.65, 0.5]} rotation={[0.25, 0, 0.18]}>
        {/* Deck */}
        <RoundedBox args={[0.32, 1.25, 0.04]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#FFD60A" roughness={0.5} />
        </RoundedBox>
        {/* Wheels & Trucks */}
        <mesh position={[0, 0.4, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
          <meshStandardMaterial color="#e11d48" />
        </mesh>
        <mesh position={[0, -0.4, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
          <meshStandardMaterial color="#e11d48" />
        </mesh>
      </group>

      {/* Metal Mesh Wastebasket under Desk */}
      <group position={[-1.7, -1.0, -0.2]} castShadow>
        <mesh>
          <cylinderGeometry args={[0.2, 0.16, 0.45, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Crumpled Paper inside */}
        <mesh position={[0.02, 0.08, 0.02]}>
          <dodecahedronGeometry args={[0.07]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      </group>

      {/* Casual Developer Sneakers on Floor */}
      <group position={[-0.8, -1.2, 1.3]} rotation={[0, -0.3, 0]}>
        <RoundedBox position={[-0.1, 0.05, 0]} args={[0.16, 0.1, 0.36]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
        </RoundedBox>
        <RoundedBox position={[0.1, 0.05, 0]} args={[0.16, 0.1, 0.36]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
        </RoundedBox>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 9. OVERALL SCENE LIGHTING & CAMERA CONFIGURATION
// -------------------------------------------------------------
function Scene() {
  return (
    <>
      {/* Studio Ambient Illumination */}
      <ambientLight intensity={0.55} />

      {/* Main Directional Sun / Window Light */}
      <directionalLight
        position={[-6, 7, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Warm Room Fill Light */}
      <pointLight position={[3, 3, 2]} intensity={0.6} color="#fef08a" distance={8} />

      {/* Cool Monitor & Cyber Glow Lights */}
      <pointLight position={[-0.1, 0.6, -0.4]} intensity={0.7} color="#38bdf8" distance={3.5} />
      <pointLight position={[1.4, 0.3, -0.8]} intensity={0.5} color="#ec4899" distance={2.5} />

      {/* Architecture, Furniture, Equipment, and Clutter */}
      <RoomStructure />
      <WallDecor />
      <DeskAndStorage />
      <MonitorSetup position={[0, 0, 0]} />
      <Equipment />
      <ErgonomicChair position={[-0.1, -0.3, 0.1]} />
      <DeskAccessories />
      <RoomLifestyleClutter />

      {/* Smooth Diorama Orbit Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4.8}
        maxPolarAngle={Math.PI / 2.15}
        minAzimuthAngle={-Math.PI / 3.2}
        maxAzimuthAngle={Math.PI / 3.2}
      />
    </>
  );
}

export default function DeveloperRoom() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [3.8, 2.5, 4.4], fov: 40 }}
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
