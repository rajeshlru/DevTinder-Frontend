import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from "./src/utils/appStore";

import Body from "./src/components/Body";
import Login from "./src/components/Login";
import Profile from "./src/components/Profile";
import Connections from "./src/components/Connections";
import Requests from "./src/components/Requests";
import Feed from "./src/components/Feed";
import About from "./src/components/About";
import AboutPage from "./src/components/AboutPage";
import HowItWorksPage from "./src/components/HowItWorksPage";
import TermsPage from "./src/components/TermsPage";
import CommunityGuidelines from "./src/components/CommunityGuidelines";
import PrivacyPolicy from "./src/components/PrivacyPolicy";
import Chat from "./src/components/Chat";
import ProtectedRoute from "./src/components/ProtectedRoute";
import ErrorPage from "./src/components/ErrorPage";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Body />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/request" element={<Requests />} />
                <Route path="/about" element={<About />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />

                <Route path="/aboutpage" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route
                  path="/Community-guidelines"
                  element={<CommunityGuidelines />}
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
