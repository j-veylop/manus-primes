interface IButton {
  text: string;
  onClick: () => void;
}
export default function Button({ text, onClick }: IButton) {
  return (
    <button className="bg-dune-alive rounded-md p-4 w-full text-white hover:bg-dune-dead transition-all duration-300" onClick={onClick}>{text}</button>
  );
}
