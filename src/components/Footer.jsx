const Footer = () => (
  <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
    <aside>
      <p className="font-bold text-xl">🍽️ PlateShare</p>
      <p>Sharing food. Building community. © {new Date().getFullYear()}</p>
      <div className="flex gap-3">
        <a href="#"><i className="fa-brands fa-facebook" /></a>
        <a href="#"><i className="fa-brands fa-x-twitter" /></a>
        <a href="#"><i className="fa-brands fa-instagram" /></a>
      </div>
    </aside>
  </footer>
);
export default Footer;
