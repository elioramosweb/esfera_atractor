// SphereWithShader.jsx
import { useRef,useMemo} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';
import { ShaderMaterial } from 'three'
import { DoubleSide } from 'three'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js'
import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

const defaultPalette = [
  "#1f77b4", // azul
  "#ff7f0e", // naranja
  "#2ca02c", // verde
  "#d62728", // rojo
  "#9467bd", // púrpura
  "#8c564b", // marrón
  "#e377c2", // rosa
  "#7f7f7f", // gris
  "#bcbd22", // oliva
  "#17becf"  // cian
];

export default function ParticulasShader({ palette = defaultPalette }) {
  const shaderRef = useRef()
  const numPoints = 1000000

  const geometry = useMemo(() => {
    const positions = new Float32Array(numPoints * 3)
    const colors = new Float32Array(numPoints * 3)

    for (let i = 0; i < numPoints; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100

      //const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)])
      const color = new THREE.Color("#FF0000")
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [numPoints, palette])

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
      pointSize: { value: 0.5},
      uA: { value: 2 },
      uB: { value: -1.4 },
      uC: { value: 2 },
      uD: { value: 1.2 },
      uE: { value: 2},
      uF: { value: 2 },
    },
    vertexColors: true,
    transparent: true,
    depthWrite: false,
  }), [])

  return (
    <points geometry={geometry}>
      <primitive object={material} attach="material" ref={shaderRef} />
    </points>
  )
}
