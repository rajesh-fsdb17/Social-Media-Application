import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../src/Layout';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import FetchPosts from './component/FetchPosts';
import { RecoilRoot } from "recoil";
import ViewPosts from "./pages/ViewPosts";
import { ToastContainer } from 'react-toastify';
import FetchUserDetails from './component/FetchUserDetails';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <FetchPosts/>
        <FetchUserDetails/>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Layout><ViewPosts/></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path='/editprofile' element={<Layout><EditProfile/></Layout>}/>
        </Routes>
     </BrowserRouter>
     <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </RecoilRoot>
  );
}

export default App;
