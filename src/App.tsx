import { Outlet } from "react-router-dom";
import UIContainer from "./components/ui/UIContainer";
function App() {
  return (
    <div>
      <UIContainer>
        <Outlet />
      </UIContainer>
    </div>
  );
}

export default App;
