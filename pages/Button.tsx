interface IButton {
  text: string;
  onClick: () => void;
}
export default function Button({ text, onClick }: IButton) {
  return (
    <button className="bg-dune-alive rounded-md p-4 w-full text-white focus:bg-dune-dead" onClick={onClick}>{text}</button>
  );
}
