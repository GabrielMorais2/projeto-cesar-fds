
import { Provider } from "react-redux";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  );
}

export default App;