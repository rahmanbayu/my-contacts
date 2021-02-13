import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";

const Guest = (props) => {
  const auth = useRecoilValue(authenticated);

  useEffect(() => {
    if (auth.check) {
      props.history.replace("/");
    }
  }, []);

  return props.children;
};

export default withRouter(Guest);
