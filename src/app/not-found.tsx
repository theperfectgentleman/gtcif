import Link from 'next/link';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

export default function NotFound() {
    return (
        <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/">
                <Button>Return Home</Button>
            </Link>
        </Container>
    );
}
