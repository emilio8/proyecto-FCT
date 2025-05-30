import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import EditUserForm from '@/components/User/EditUserForm';

export default function EditUserPage() {
    return (
        <>
            <Header />
            <Navbar />
            <main>
                <EditUserForm />
            </main>
        </>
    );
}
