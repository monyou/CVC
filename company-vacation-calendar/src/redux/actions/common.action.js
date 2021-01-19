import { TOGGLE_LOADING } from "../constants";

function toggleLoadingAction() {
  return {
    type: TOGGLE_LOADING,
  };
}

export { toggleLoadingAction };
