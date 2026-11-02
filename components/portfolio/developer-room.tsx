'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// 1. DESK & MODERN STEEL FRAME LEGS
// -------------------------------------------------------------
function Desk() {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Matte Dark Walnut Tabletop with Beveled Edges */}
      <RoundedBox args={[5.2, 0.12, 2.6]} radius={0.04} smoothness={4} receiveShadow castShadow>
        <meshStandardMaterial color="#1e1e24" roughness={0.4} metalness={0.1} />
      </RoundedBox>

      {/* Large Neo-Brutalist Desk Pad with Yellow Accent Border */}
      <mesh position={[0, 0.065, 0.1]} receiveShadow>
        <boxGeometry args={[3.8, 0.015, 1.8]} />
        <meshStandardMaterial color="#111116" roughness={0.8} />
      </mesh>
      {/* Accent Stitching Border */}
      <mesh position={[0, 0.07, 0.1]}>
        <boxGeometry args={[3.84, 0.005, 1.84]} />
        <meshStandardMaterial color="#FFD60A" roughness={0.3} />
      </mesh>

      {/* Left Steel Leg Frame */}
      <group position={[-2.3, -0.7, 0]}>
        <mesh position={[0, 0, 0.9]} castShadow>
          <boxGeometry args={[0.08, 1.3, 0.08]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.9]} castShadow>
          <boxGeometry args={[0.08, 1.3, 0.08]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.62, 0]}>
          <boxGeometry args={[0.08, 0.06, 1.88]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <boxGeometry args={[0.08, 0.06, 1.88]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Right Steel Leg Frame */}
      <group position={[2.3, -0.7, 0]}>
        <mesh position={[0, 0, 0.9]} castShadow>
          <boxGeometry args={[0.08, 1.3, 0.08]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.9]} castShadow>
          <boxGeometry args={[0.08, 1.3, 0.08]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.62, 0]}>
          <boxGeometry args={[0.08, 0.06, 1.88]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <boxGeometry args={[0.08, 0.06, 1.88]} />
          <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 2. MAIN ULTRAWIDE CURVED AI MONITOR (INTERACTIVE MODES)
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
      '# [AI PIPELINE] Inference: 12ms | 60 FPS',
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

function MainMonitor({ position }: { position: [number, number, number] }) {
  const [modeIndex, setModeIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef<THREE.Mesh>(null);
  const currentMode = SCREEN_MODES[modeIndex];

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
    }
  });

  const nextMode = () => {
    setModeIndex((prev) => (prev + 1) % SCREEN_MODES.length);
  };

  return (
    <group position={position}>
      {/* Aluminum Stand Base & Heavy Arm */}
      <mesh position={[0, -0.48, -0.1]} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.04, 32]} />
        <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.1, -0.18]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.16, 0.75, 0.12]} />
        <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Monitor Outer Chassis */}
      <RoundedBox args={[2.8, 1.5, 0.09]} radius={0.04} smoothness={4} castShadow>
        <meshStandardMaterial color="#09090b" metalness={0.5} roughness={0.4} />
      </RoundedBox>

      {/* Interactive Clickable Screen Surface */}
      <mesh
        ref={screenRef}
        position={[0, 0, 0.05]}
        onClick={nextMode}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[2.68, 1.38]} />
        <meshStandardMaterial
          color="#030712"
          emissive={hovered ? '#1e3a8a' : '#0f172a'}
          emissiveIntensity={0.45}
        />
      </mesh>

      {/* Window Title Bar */}
      <mesh position={[0, 0.58, 0.06]}>
        <planeGeometry args={[2.66, 0.14]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* macOS-style Dots (Red, Yellow, Green) */}
      <mesh position={[-1.22, 0.58, 0.07]}>
        <circleGeometry args={[0.026, 16]} />
        <meshBasicMaterial color="#EF4444" />
      </mesh>
      <mesh position={[-1.14, 0.58, 0.07]}>
        <circleGeometry args={[0.026, 16]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>
      <mesh position={[-1.06, 0.58, 0.07]}>
        <circleGeometry args={[0.026, 16]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>

      {/* Window Title text */}
      <Text
        position={[-0.96, 0.58, 0.07]}
        fontSize={0.06}
        color="#94A3B8"
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
      >
        {currentMode.title}
      </Text>

      {/* Interactive Mode Badge */}
      <mesh position={[0.92, 0.58, 0.07]}>
        <planeGeometry args={[0.7, 0.08]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>
      <Text
        position={[0.92, 0.58, 0.08]}
        fontSize={0.048}
        color={currentMode.badgeColor}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {currentMode.badge}
      </Text>

      {/* Code / Terminal Content Lines */}
      {currentMode.code.map((line, i) => (
        <Text
          key={i}
          position={[-1.24, 0.38 - i * 0.12, 0.07]}
          fontSize={0.068}
          color={
            i === 0
              ? '#FFD60A'
              : i === 1
              ? '#38BDF8'
              : i === 2
              ? '#F472B6'
              : i === 3
              ? '#4ADE80'
              : i === 4
              ? '#A78BFA'
              : '#E2E8F0'
          }
          anchorX="left"
          anchorY="middle"
        >
          {line}
        </Text>
      ))}

      {/* Click prompt bottom bar */}
      <Text
        position={[0, -0.56, 0.07]}
        fontSize={0.046}
        color={hovered ? '#FFD60A' : '#64748B'}
        anchorX="center"
        anchorY="middle"
      >
        {hovered ? '✦ Click to Switch Mode ✦' : 'Click monitor to toggle AI / Web / Training modes'}
      </Text>
    </group>
  );
}

// -------------------------------------------------------------
// 3. SECONDARY VERTICAL MONITOR (TELEMETRY & NEURAL METRICS)
// -------------------------------------------------------------
function VerticalMonitor({ position }: { position: [number, number, number] }) {
  const barsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (barsRef.current) {
      barsRef.current.children.forEach((child, i) => {
        const h = 0.15 + Math.sin(state.clock.elapsedTime * 3 + i * 1.2) * 0.08;
        child.scale.y = Math.max(0.2, h);
      });
    }
  });

  return (
    <group position={position} rotation={[0, 0.38, 0]}>
      {/* Stand */}
      <mesh position={[0, -0.48, -0.05]} castShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.04, 24]} />
        <meshStandardMaterial color="#27272a" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[0.1, 0.8, 0.08]} />
        <meshStandardMaterial color="#18181b" metalness={0.7} />
      </mesh>

      {/* Frame */}
      <RoundedBox args={[1.05, 1.7, 0.08]} radius={0.03} smoothness={4} castShadow>
        <meshStandardMaterial color="#09090b" metalness={0.6} />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.96, 1.6]} />
        <meshStandardMaterial color="#020617" emissive="#064e3b" emissiveIntensity={0.35} />
      </mesh>

      {/* Header */}
      <Text position={[0, 0.7, 0.055]} fontSize={0.06} color="#34D399" anchorX="center" fontWeight="bold">
        AI TELEMETRY
      </Text>

      {/* GPU stats box */}
      <mesh position={[0, 0.5, 0.052]}>
        <planeGeometry args={[0.88, 0.22]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      <Text position={[-0.4, 0.54, 0.06]} fontSize={0.045} color="#94A3B8" anchorX="left">
        GPU: RTX 4090
      </Text>
      <Text position={[-0.4, 0.46, 0.06]} fontSize={0.045} color="#F59E0B" anchorX="left">
        VRAM: 18.2 / 24 GB
      </Text>

      {/* Neural Network Loss Bars */}
      <Text position={[-0.4, 0.28, 0.055]} fontSize={0.045} color="#94A3B8" anchorX="left">
        Real-time Loss Rate:
      </Text>
      <group ref={barsRef} position={[0, 0.12, 0.055]}>
        {[-0.32, -0.16, 0, 0.16, 0.32].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.08, 1, 0.01]} />
            <meshStandardMaterial
              color={i === 2 ? '#22C55E' : '#38BDF8'}
              emissive={i === 2 ? '#22C55E' : '#38BDF8'}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Model accuracy badge */}
      <mesh position={[0, -0.2, 0.052]}>
        <planeGeometry args={[0.88, 0.2]} />
        <meshBasicMaterial color="#064e3b" />
      </mesh>
      <Text position={[0, -0.16, 0.06]} fontSize={0.042} color="#A7F3D0" anchorX="center">
        Validation Acc:
      </Text>
      <Text position={[0, -0.24, 0.06]} fontSize={0.07} color="#FFFFFF" anchorX="center" fontWeight="bold">
        98.7%
      </Text>

      {/* System Status indicator */}
      <Text position={[0, -0.45, 0.055]} fontSize={0.045} color="#38BDF8" anchorX="center">
        Latency: 11.4 ms
      </Text>
      <Text position={[0, -0.55, 0.055]} fontSize={0.045} color="#4ADE80" anchorX="center">
        ● ALL NODES OK
      </Text>
    </group>
  );
}

// -------------------------------------------------------------
// 4. HIGH-END RGB LIQUID-COOLED PC TOWER
// -------------------------------------------------------------
function ComputerTower({ position }: { position: [number, number, number] }) {
  const fanRef1 = useRef<THREE.Group>(null);
  const fanRef2 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (fanRef1.current) fanRef1.current.rotation.z += delta * 6;
    if (fanRef2.current) fanRef2.current.rotation.z += delta * 6;
  });

  return (
    <group position={position} rotation={[0, -0.22, 0]}>
      {/* Matte Black Chassis Case */}
      <RoundedBox args={[0.7, 1.25, 1.3]} radius={0.03} smoothness={4} castShadow>
        <meshStandardMaterial color="#0c0a09" metalness={0.7} roughness={0.3} />
      </RoundedBox>

      {/* Tempered Glass Side Window */}
      <mesh position={[-0.355, 0.05, 0.02]}>
        <planeGeometry args={[1.15, 1.1]} />
        <meshStandardMaterial
          color="#0f172a"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Internal Motherboard Backplate */}
      <mesh position={[-0.15, 0.05, 0]}>
        <boxGeometry args={[0.02, 1.05, 0.9]} />
        <meshStandardMaterial color="#1e1e24" />
      </mesh>

      {/* GPU Block with Glowing RGB Logo */}
      <mesh position={[-0.22, -0.15, 0.05]} castShadow>
        <boxGeometry args={[0.18, 0.22, 0.7]} />
        <meshStandardMaterial color="#27272a" metalness={0.8} />
      </mesh>
      <mesh position={[-0.315, -0.15, 0.05]}>
        <planeGeometry args={[0.55, 0.06]} />
        <meshStandardMaterial color="#FF4D6D" emissive="#FF4D6D" emissiveIntensity={0.8} />
      </mesh>

      {/* Dual Front RGB Cooling Fans */}
      <group position={[-0.15, 0.2, 0.58]} rotation={[0, Math.PI / 2, 0]}>
        <group ref={fanRef1}>
          <mesh>
            <torusGeometry args={[0.16, 0.02, 16, 32]} />
            <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.8} />
          </mesh>
          {[0, 1, 2, 3].map((r) => (
            <mesh key={r} rotation={[0, 0, (r * Math.PI) / 2]}>
              <boxGeometry args={[0.03, 0.26, 0.01]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
          ))}
        </group>
      </group>

      <group position={[-0.15, -0.22, 0.58]} rotation={[0, Math.PI / 2, 0]}>
        <group ref={fanRef2}>
          <mesh>
            <torusGeometry args={[0.16, 0.02, 16, 32]} />
            <meshStandardMaterial color="#FFD60A" emissive="#FFD60A" emissiveIntensity={0.8} />
          </mesh>
          {[0, 1, 2, 3].map((r) => (
            <mesh key={r} rotation={[0, 0, (r * Math.PI) / 2]}>
              <boxGeometry args={[0.03, 0.26, 0.01]} />
              <meshStandardMaterial color="#d97706" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Internal Ambient Glow from inside the PC */}
      <pointLight position={[-0.2, 0.1, 0]} color="#FF4D6D" intensity={0.4} distance={1.2} />
    </group>
  );
}

// -------------------------------------------------------------
// 5. STUDIO AUDIO MONITORS (LEFT & RIGHT WITH KEVLAR CONES)
// -------------------------------------------------------------
function StudioSpeaker({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation} castShadow>
      {/* Speaker Cabinet */}
      <RoundedBox args={[0.42, 0.65, 0.45]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color="#18181b" roughness={0.5} />
      </RoundedBox>

      {/* Tweeter (Highs) */}
      <mesh position={[0, 0.16, 0.23]}>
        <cylinderGeometry args={[0.06, 0.06, 0.015, 24]} />
        <meshStandardMaterial color="#09090b" roughness={0.2} />
      </mesh>

      {/* Iconic Yellow Woofer (Lows) */}
      <mesh position={[0, -0.1, 0.23]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 32]} />
        <meshStandardMaterial color="#FFD60A" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.1, 0.245]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#09090b" />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 6. MECHANICAL KEYBOARD & WIRELESS GAMING MOUSE
// -------------------------------------------------------------
function MechanicalKeyboard({ position }: { position: [number, number, number] }) {
  const keys = useMemo(() => {
    const list: { pos: [number, number, number]; color: string }[] = [];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 14; c++) {
        // Custom Neo-Brutalist Keycap Scheme
        let color = '#f1f5f9';
        if (r === 0 && c === 0) color = '#FF4D6D'; // Esc key
        else if (r === 2 && c === 13) color = '#FFD60A'; // Enter
        else if (r === 4 && (c >= 4 && c <= 8)) color = '#2563EB'; // Spacebar
        else if (c === 0 || c >= 12) color = '#334155'; // Modifier keys

        list.push({
          pos: [-0.65 + c * 0.095, 0.04, -0.18 + r * 0.088],
          color,
        });
      }
    }
    return list;
  }, []);

  return (
    <group position={position} rotation={[-0.04, 0, 0]}>
      {/* Anodized Aluminum Base Chassis */}
      <RoundedBox args={[1.42, 0.07, 0.52]} radius={0.02} smoothness={4} castShadow>
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.2} />
      </RoundedBox>

      {/* Individual Keycaps */}
      {keys.map((k, i) => (
        <mesh key={i} position={k.pos}>
          <boxGeometry args={[0.075, 0.035, 0.07]} />
          <meshStandardMaterial color={k.color} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function WirelessMouse({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -0.05, 0]} castShadow>
      {/* Ergonomic Mouse Shell */}
      <RoundedBox args={[0.22, 0.07, 0.38]} radius={0.04} smoothness={6}>
        <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.4} />
      </RoundedBox>
      {/* Scroll wheel */}
      <mesh position={[0, 0.04, -0.06]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.04, 16]} />
        <meshStandardMaterial color="#FFD60A" />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 7. DEVELOPER COFFEE MUG WITH ANIMATED STEAM
// -------------------------------------------------------------
function CoffeeMug({ position }: { position: [number, number, number] }) {
  const steamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.children.forEach((child, i) => {
        child.position.y = 0.25 + Math.sin(state.clock.elapsedTime * 2.2 + i * 1.5) * 0.08;
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.18;
      });
    }
  });

  return (
    <group position={position}>
      {/* Ceramic Mug Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.28, 24]} />
        <meshStandardMaterial color="#FFD60A" roughness={0.3} />
      </mesh>
      {/* Hot Coffee Liquid */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.02, 24]} />
        <meshStandardMaterial color="#2d1606" roughness={0.1} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.16, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.025, 12, 24]} />
        <meshStandardMaterial color="#FFD60A" />
      </mesh>
      {/* Animated Rising Steam Particles */}
      <group ref={steamRef}>
        {[0, 0.06, -0.06].map((x, i) => (
          <mesh key={i} position={[x, 0.25, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 8. FLOATING 3D TECH STACK BADGES (PHYSICS FLOAT)
// -------------------------------------------------------------
function FloatingBadge({
  position,
  label,
  accent,
  bg,
}: {
  position: [number, number, number];
  label: string;
  accent: string;
  bg: string;
}) {
  return (
    <Float speed={2.5} rotationIntensity={0.25} floatIntensity={0.35}>
      <group position={position}>
        <RoundedBox args={[0.62, 0.32, 0.06]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial color={bg} metalness={0.2} roughness={0.3} />
        </RoundedBox>
        {/* Accent indicator dot */}
        <mesh position={[-0.2, 0, 0.035]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color={accent} />
        </mesh>
        <Text
          position={[0.06, 0, 0.04]}
          fontSize={0.08}
          color="#ffffff"
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

// -------------------------------------------------------------
// 9. OVERALL SCENE & LIGHTING
// -------------------------------------------------------------
function Scene() {
  return (
    <>
      {/* Balanced Studio & Ambient Illumination */}
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={0.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Warm Ambient Desk Lamp Light */}
      <pointLight position={[-1.5, 1.8, 1]} intensity={0.6} color="#fef08a" distance={4} />
      {/* Cool Monitor & Cyber Glow */}
      <pointLight position={[0, 0.5, 0.2]} intensity={0.5} color="#38bdf8" distance={3} />
      <pointLight position={[2, 0.5, 0]} intensity={0.5} color="#ec4899" distance={2.5} />

      {/* Main Furniture & Equipment Setup */}
      <Desk />
      <MainMonitor position={[0, 0.35, -0.42]} />
      <VerticalMonitor position={[-1.9, 0.45, -0.15]} />
      <ComputerTower position={[2.0, 0.18, -0.12]} />

      {/* Audio Studio Monitors */}
      <StudioSpeaker position={[-2.45, 0.05, -0.5]} rotation={[0, 0.32, 0]} />
      <StudioSpeaker position={[1.35, 0.05, -0.55]} rotation={[0, -0.28, 0]} />

      {/* Peripherals & Accents */}
      <MechanicalKeyboard position={[-0.1, -0.5, 0.45]} />
      <WirelessMouse position={[1.15, -0.5, 0.45]} />
      <CoffeeMug position={[1.4, -0.44, 0.1]} />

      {/* Floating Interactive AI Tech Badges */}
      <FloatingBadge position={[-2.6, 1.7, -0.8]} label="PyTorch" accent="#EE4C2C" bg="#1e1b4b" />
      <FloatingBadge position={[2.5, 1.8, -0.5]} label="YOLOv8" accent="#00F2FE" bg="#042f2e" />
      <FloatingBadge position={[-1.6, 2.2, 0.4]} label="Next.js" accent="#FFFFFF" bg="#09090b" />
      <FloatingBadge position={[2.6, 0.8, 0.8]} label="FastAPI" accent="#009688" bg="#022c22" />
      <FloatingBadge position={[-2.2, 0.6, 1]} label="Python" accent="#FFD60A" bg="#172554" />
      <FloatingBadge position={[1.6, 2.3, 0]} label="Docker" accent="#2496ED" bg="#082f49" />

      {/* Soft Floor Shadow for Realism */}
      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.65}
        scale={10}
        blur={2.4}
        far={4.5}
        color="#000000"
      />

      {/* Smooth Orbit Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 4.2}
        maxPolarAngle={Math.PI / 2.05}
        minAzimuthAngle={-Math.PI / 2.8}
        maxAzimuthAngle={Math.PI / 2.8}
      />
    </>
  );
}

export default function DeveloperRoom() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 1.3, 4.8], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
