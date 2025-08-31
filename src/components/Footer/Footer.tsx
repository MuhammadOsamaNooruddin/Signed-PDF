export const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} SignPDF by Osama. All rights reserved.</p>
            </div>
        </footer>
    );
};
