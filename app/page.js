import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex items-center justify-evenly flex-wrap min-h-dvh">
            <Link href={'/dashboard'}>
                <DashboardBTN>Go to Dashboard</DashboardBTN>
            </Link>
        </main>
    );
}
