import { Link } from "react-router-dom";
import NotFoundGif from "../assets/not-found.gif"; // import your local gif

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <img
        className="mx-auto w-72 mb-6"
        src={NotFoundGif} // use imported local gif
        alt="Not found"
      />
      <h1 className="font-display text-4xl font-extrabold mb-2">
        Page not found
      </h1>
      <p className="text-neutral/70 mb-6">
        We can’t seem to find the page you’re looking for.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}
