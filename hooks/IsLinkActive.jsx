'use client';

import { usePathname } from 'next/navigation';

const IsLinkActive = link => link === usePathname();

export default IsLinkActive;
