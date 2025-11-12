export default function Loader() {
  return (
    <div className="w-full py-8 flex items-center justify-center">
      <div className="radial-progress" style={{ '--value': 70 }}>Loading</div>
    </div>
  );
}
