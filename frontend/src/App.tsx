import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;