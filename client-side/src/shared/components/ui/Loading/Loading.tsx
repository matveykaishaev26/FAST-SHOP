import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  loading: boolean;
}
export default function Loading({ loading }: Props) {
  return <ClipLoader loading={loading} />;
}
