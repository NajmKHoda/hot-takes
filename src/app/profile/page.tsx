import ClientProfile from '@/components/client/ClientProfile';
import { getUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function Profile() {
    const user = await getUser();
    if (!user) redirect('/');

    return <ClientProfile username={user.username} email={user.email} />
}