import BeatLoader from "react-spinners/BeatLoader";

interface Props {
  loading: boolean;
}
export default function Loading({ loading }: Props) {
  return <BeatLoader loading={loading} />;
}
