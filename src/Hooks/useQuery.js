import { useLocation } from "react-router-dom";
export function useQuery() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  let parameters = {};
  for (const p of searchParams) {
    const objectKey = p[0]
    const value = p[1]
    parameters = {...parameters, [objectKey]:value}
  }
  return parameters;
}