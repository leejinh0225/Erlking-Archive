'use client';

import { useEffect } from 'react';
import { setupMotion } from './motion';

export default function Interactions() {
  useEffect(() => setupMotion(), []);
  return null;
}
