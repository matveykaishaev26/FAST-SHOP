import BeatLoader from "react-spinners/BeatLoader";

interface Props {
  loading: boolean;
}
export default function Loading({ loading }: Props) {
  return <BeatLoader color="#9a6df7" className="text-foreground " loading={loading} />;
}
