import Navbar from '@/components/Navbar';
import CreateUserForm from '@/components/User/CreateUserForm';

export default function RegisterPage() {
    return (
        <>
            <Navbar />
            <main>
                <CreateUserForm />
            </main>
        </>
    );
}