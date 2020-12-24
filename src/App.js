import React, { useState, useRef, Suspense } from 'react'
import './App.scss'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { softShadows, OrbitControls } from 'drei'
import { useSpring, a } from 'react-spring/three'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'


softShadows()

const SpiningMesh = ({position, args}) => {
    const mesh = useRef(null)
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    const [expand, setExpand] = useState(false)

    const props = useSpring({
        scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1]
    })

    const textures = ['x1', 'x2', 'y1', '']
    const cubeTextures = new Array(6)

    const texture_1 = useLoader(TextureLoader, 'img/cube1/x1.jpg')
    const texture_2 = useLoader(TextureLoader, 'img/cube1/x2.jpg')
    const texture_3 = useLoader(TextureLoader, 'img/cube1/y1.jpg')
    const texture_4 = useLoader(TextureLoader, 'img/cube1/y2.jpg')
    const texture_5 = useLoader(TextureLoader, 'img/cube1/z1.jpg')
    const texture_6 = useLoader(TextureLoader, 'img/cube1/z2.jpg')


    return (
        <a.mesh onClick={() => setExpand(!expand)} scale={props.scale} castShadow position={position} ref={mesh}>
            <boxBufferGeometry attach="geometry" args={args}/>
            <meshStandardMaterial map={texture_1} attachArray="material" />
            <meshStandardMaterial map={texture_2} attachArray="material" />
            <meshStandardMaterial map={texture_3} attachArray="material" />
            <meshStandardMaterial map={texture_4} attachArray="material" />
            <meshStandardMaterial map={texture_5} attachArray="material" />
            <meshStandardMaterial map={texture_6} attachArray="material" />
            
        </a.mesh>
    )
}

const App = () => {

    return (
    <>
        <Canvas shadowMap colorManagement camera={{position: [-5, 2, 10], fov: 60}}>
            <ambientLight intensity={0.3}/>
            <directionalLight 
                castShadow
                position={[0, 10, 0]} 
                intensity={0.5} 
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}

            />
            <pointLight position={[-10, 0, -20]} intensity={0.5}/>
            <pointLight position={[0, -10, 0]} intensity={1.5}/>

            <group>
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                    <planeBufferGeometry attach="geometry" args={[100, 100]}/>
                    <shadowMaterial attach="material" opacity={0.3} />
                </mesh>

                <Suspense fallback={null}>
                    <SpiningMesh position={[0, 1, 0]} args={[3, 2, 1]} speed={2}/>
                </Suspense>
                    {/* <Box /> */}
                {/* <SpiningMesh position={[-2, 1,-5]} color="pink" speed={6}/>
                <SpiningMesh position={[5, 1, -2]} color="pink" speed={6}/> */}
            </group>

            <OrbitControls />
        </Canvas>
    </>
    )
}
  
  export default App