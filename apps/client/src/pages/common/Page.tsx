import './Page.css'
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Page = () => {
    return (
        <div id="page-container">
            <div id="content-wrap">
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
};

export default Page;