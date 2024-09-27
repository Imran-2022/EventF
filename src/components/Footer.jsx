const Footer = () => {
    return (
        <footer className="p-10 bg-cyan-800 text-white">
            <div className="footer max-w-6xl mx-auto">
                <aside>
                    {/* Updated SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 fill-current text-white" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14 7.41V5a2 2 0 00-2-2H8a2 2 0 00-2 2v2.41l-1.3-1.29a1 1 0 00-1.4 1.42l4 4a1 1 0 001.4 0l4-4a1 1 0 10-1.4-1.42L14 7.4zM18 14a1 1 0 01-1 1h-1v-1a1 1 0 00-1-1h-2a1 1 0 00-1 1v1H7v-1a1 1 0 00-1-1H4a1 1 0 00-1 1v1H2a1 1 0 01-1-1V6a1 1 0 011-1h4V4a2 2 0 012-2h4a2 2 0 012 2v1h4a1 1 0 011 1v8z" clipRule="evenodd" />
                    </svg>
                    <p>EventManager<br />Organizing and managing your events seamlessly</p>
                </aside>
                <nav>
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Event Planning</a>
                    <a className="link link-hover">Venue Booking</a>
                    <a className="link link-hover">Catering Services</a>
                    <a className="link link-hover">Event Promotion</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About Us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Careers</a>
                    <a className="link link-hover">Press Kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of Use</a>
                    <a className="link link-hover">Privacy Policy</a>
                    <a className="link link-hover">Cookie Policy</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
