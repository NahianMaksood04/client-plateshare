import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
return (
<footer className="bg-base-200 border-t border-base-300 mt-16">
<div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="flex items-start gap-3">
<img src="/src/assets/logo.svg" className="w-10 h-10" />
<div>
<h3 className="text-xl font-bold">PlateShare</h3>
<p className="opacity-80">Share surplus food, reduce waste, and nourish the community.</p>
</div>
</div>
<div className="md:col-span-2 flex md:justify-end items-center gap-4">
<a href="https://x.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
<SiX size={20} />
</a>
<a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
<FaGithub size={20} />
</a>
<a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
<FaLinkedin size={20} />
</a>
<a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
<FaFacebook size={20} />
</a>
<a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle">
<FaInstagram size={20} />
</a>
</div>
</div>
<div className="border-t border-base-300">
<div className="container mx-auto py-4 text-center text-sm opacity-70">
© {new Date().getFullYear()} PlateShare — All rights reserved.
</div>
</div>
</footer>
);
};
export default Footer;