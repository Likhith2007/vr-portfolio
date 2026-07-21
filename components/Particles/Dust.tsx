'use client';
import DustParticles from '@/components/Theatre/DustParticles';
export default function Dust({ count = 300 }) { return <DustParticles count={count} area={[40, 10, 40]} />; }
