import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";

const Auth = (props) => {
  const auth = useRecoilValue(authenticated);

  useEffect(() => {
    if (!auth.check) {
      props.history.replace("/login");
    }
  }, []);

  return props.children;
};

export default withRouter(Auth);
