export const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} SignPDF by Osama. All rights reserved.</p>
            </div>
        </footer>
    );
};
