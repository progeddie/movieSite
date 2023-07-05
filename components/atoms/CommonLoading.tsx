import ReactLoading from "react-loading";

export default function CommonLoading({
  type,
  color,
}: {
  type: string;
  color: string;
}) {
  return <ReactLoading type={type} color={color} width={300} height={300} />;
}
