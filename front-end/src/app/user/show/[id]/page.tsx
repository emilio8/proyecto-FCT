import ShowUser from '@/components/User/ShowUser';

export default function UserShowPage({ params }: { params: { id: string } }) {
    return (
        <ShowUser userId={params.id} />
    );
}