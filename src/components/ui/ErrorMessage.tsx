export default function ErrorMessage({ message }: { message: string }) {
  return <div role="alert" className="card border border-co/30 text-center text-co">{message}</div>;
}
