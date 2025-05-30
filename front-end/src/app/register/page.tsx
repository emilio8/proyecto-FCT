import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import CreateUserForm from '@/components/User/CreateUserForm';

export default function RegisterPage() {
    return (
        <>
            <Header />
            <Navbar />
            <main>
                <CreateUserForm />
            </main>
        </>
    );
}